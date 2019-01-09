from recursion.map import recursive_map


def test_empty():
    assert recursive_map(str.upper, []) == []


def test_single_element():
    assert recursive_map(str.upper, ['a']) == ['A']


def test_multiple_elements():
    assert recursive_map(str.upper, ['a', 'b']) == ['A', 'B']
