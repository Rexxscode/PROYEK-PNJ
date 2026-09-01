<?php

namespace App\Services;

use App\Repositories\MajorRepository;
use App\Repositories\MateriRepository;

class MajorService
{
    public function __construct(
        private MajorRepository $majors,
        private MateriRepository $materis,
    ) {}

    public function list(): array
    {
        return [
            'data' => $this->majors->all(),
        ];
    }

    public function materi(string $majorId): array
    {
        $materiList = $this->materis->listByMajor($majorId);

        return [
            'data' => $materiList,
        ];
    }
}
