# -*- coding: utf-8 -*-
from recursion.reverse_string import reverse


def test_single_char():
    assert reverse('a') == 'a'


def test_two_chars():
    assert reverse('ab') == 'ba'


def test_odd_len():
    assert reverse('abcde') == 'edcba'


def test_even_len():
    assert reverse('abcdef') == 'fedcba'


def test_unicode_chars():
    assert reverse(u"<💩><👽>") == u">\U0001F47D<>\U0001F4A9<"
