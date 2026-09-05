<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Base repository providing common Eloquent query helpers.
 */
abstract class Repository
{
    abstract protected function model(): string;

    public function query(): Builder
    {
        return call_user_func([$this->model(), 'query']);
    }

    public function all(): Collection
    {
        return $this->query()->get();
    }

    public function find($id): ?Model
    {
        return $this->query()->find($id);
    }

    public function findOrFail($id): Model
    {
        return $this->query()->findOrFail($id);
    }

    public function create(array $data): Model
    {
        return $this->query()->create($data);
    }

    public function update(Model $model, array $data): bool
    {
        return $model->update($data);
    }

    public function delete(Model $model): bool
    {
        return (bool) $model->delete();
    }
}
