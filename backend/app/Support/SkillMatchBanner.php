<?php

namespace App\Support;

class SkillMatchBanner
{
    /**
     * ANSI codes for a blue banner.
     *
     * @var string
     */
    protected const BOLD = "\033[1m";
    protected const BLUE_FG = "\033[94m";
    protected const BLUE_BG = "\033[44m";
    protected const WHITE_FG = "\033[97m";
    protected const RESET = "\033[0m";
    protected const CLEAR = "\033[2K";
    protected const MOVE_UP = "\033[1A";

    /**
     * Print the SkillMatch banner to the terminal (only when TTY).
     */
    public static function print(): void
    {
        $lines = static::lines();
        $width = max(array_map('strlen', $lines));

        $border = str_repeat('=', $width + 4);

        echo PHP_EOL;
        echo static::CLEAR . static::BLUE_BG . static::BLUE_FG . ' ' . str_repeat(' ', $width + 2) . static::RESET . PHP_EOL;
        foreach ($lines as $line) {
            $padding = str_repeat(' ', $width - strlen($line));
            echo static::CLEAR . static::BLUE_BG . static::BOLD . static::WHITE_FG
                . ' ' . $line . $padding . ' ' . static::RESET . PHP_EOL;
        }
        echo static::CLEAR . static::BLUE_BG . static::BLUE_FG . ' ' . str_repeat(' ', $width + 2) . static::RESET . PHP_EOL;
        echo static::BLUE_FG . $border . static::RESET . PHP_EOL;
        echo PHP_EOL;
    }

    /**
     * ASCII lines for the "SkillMatch" banner.
     *
     * @return string[]
     */
    protected static function lines(): array
    {
        return [
            '  ____  _ _    _ _ _       __  __       _     _     ',
            ' / ___|| (_)_ | (_) | __ _|  \/  | __ _| |__ | |_  ',
            " \\___ \\| |_| | | | |/ _` | |\\/| |/ _` | '_ \\| __| ",
            '  ___) | | | | | | | (_| | |  | | (_| | | | | |_  ',
            ' |____/|_|_|_|_|_|_|\\__,_|_|  |_|\\__,_|_| |_|\\__| ',
            '',
            'Career Readiness Platform for Indonesian Vocational Students',
        ];
    }
}