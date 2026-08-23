<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'career_id', 'match_percentage'])]
class StudentCareerMatch extends Model
{
}
