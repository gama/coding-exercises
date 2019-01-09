#!/usr/bin/env python3
# pylama:ignore=E221,E501

from math import floor


def reverse(string):
    if len(string) == 1:
        return string
    return reverse(string[1:]) + string[0]
