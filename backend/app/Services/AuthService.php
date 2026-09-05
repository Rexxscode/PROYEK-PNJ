<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\MajorRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        private UserRepository $users,
        private MajorRepository $majors,
    ) {}

    /**
     * @throws ValidationException
     */
    public function login(array $credentials): array
    {
        $user = $this->users->findByEmail($credentials['email']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw new \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException('', 'Invalid credentials');
        }

        if ($user->role === 'industry') {
            $industry = $user->industry;
            if ($industry && $industry->status !== 'approved') {
                throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException('Industry account not approved yet');
            }
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $this->formatUser($user),
        ];
    }

    /**
     * @throws ValidationException
     */
    public function register(array $data): array
    {
        $existingUser = $this->users->findByEmail($data['email']);
        if ($existingUser) {
            throw ValidationException::withMessages([
                'email' => 'The email address is already registered.',
            ]);
        }

        $user = $this->users->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
        ]);

        if ($data['role'] === 'student') {
            $major = $this->majors->findByShortCode($data['major']);
            if (!$major) {
                throw ValidationException::withMessages([
                    'major' => 'Invalid major code.',
                ]);
            }
            $user->student()->create([
                'user_id' => $user->id,
                'major_id' => $major->short_code,
                'grade' => $data['grade'],
            ]);
        } elseif ($data['role'] === 'industry') {
            $user->industry()->create([
                'user_id' => $user->id,
                'company' => $data['company'],
                'status' => 'pending',
            ]);
        }

        $user->loadMissing(['student.major', 'industry']);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $this->formatUser($user),
        ];
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()?->delete();
    }

    /**
     * @throws ValidationException
     */
    public function forgotPassword(string $email): array
    {
        $user = $this->users->findByEmail($email);

        if (!$user) {
            // Do not reveal whether the email exists.
            return ['message' => 'If that email is registered, a reset token has been generated.'];
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['email' => $email, 'token' => Hash::make($token), 'created_at' => now()]
        );

        // In the log mailer, surface the token so it can be tested/reset.
        logger("Password reset token for {$email}: {$token}");

        return [
            'message' => 'Password reset token generated.',
            'token' => $token,
        ];
    }

    /**
     * @throws ValidationException
     */
    public function resetPassword(string $email, string $token, string $password): void
    {
        $record = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$record || !Hash::check($token, $record->token)) {
            throw ValidationException::withMessages([
                'token' => 'Invalid or expired reset token',
            ]);
        }

        $user = $this->users->findByEmail($email);

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => 'User not found',
            ]);
        }

        $this->users->update($user, [
            'password' => Hash::make($password),
        ]);

        DB::table('password_reset_tokens')->where('email', $email)->delete();

        $user->tokens()->delete();
    }

    public function changePassword(User $user, string $currentPassword, string $newPassword): void
    {
        if (!Hash::check($currentPassword, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => 'Current password is incorrect',
            ]);
        }

        $this->users->update($user, [
            'password' => Hash::make($newPassword),
        ]);

        $user->tokens()->delete();
    }

    public function formatUser(User $user): array
    {
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'created_at' => $user->created_at?->toISOString(),
        ];

        if ($user->role === 'student' && $user->student) {
            $data['student'] = [
                'major' => $user->student->major?->short_code,
                'major_name' => $user->student->major?->name,
                'grade' => $user->student->grade,
                'card_status' => $user->student->card_status ?? 'none',
                'student_card' => $user->student->student_card,
                'avatar' => $user->student->avatar,
            ];
        } elseif ($user->role === 'industry' && $user->industry) {
            $data['industry'] = [
                'company_name' => $user->industry->company,
                'status' => $user->industry->status,
            ];
        }

        return $data;
    }
}
