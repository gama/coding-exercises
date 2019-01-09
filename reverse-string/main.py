#!/usr/bin/env python3
# pylama:ignore=E221,E501

from math import floor


def reverse(string):
    if len(string) == 1:
        return string

    half_idx       = floor(len(string) / 2)
    has_even_len   = len(string) % 2 == 0
    middle_chr     = '' if has_even_len else string[half_idx]
    return reverse(string[-half_idx:]) + middle_chr + reverse(string[:half_idx])


if __name__ == '__main__':
    import sys
    input = sys.argv[0]
