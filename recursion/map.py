#!/usr/bin/env python3
# pylama:ignore=E221,E501


def recursive_map(func, list):
    if not list:
        return []
    return [func(list[0])] + recursive_map(func, list[1:])
