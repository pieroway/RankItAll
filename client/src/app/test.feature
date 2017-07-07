Feature: Outlines Test
    I want to test Outlines

Scenario Outline: I want to iterate examples
    Given I load in <a> and <b>
    Then the values are equal

    Examples:
    | description    | a | b |
    | test different | 1 | 2 |
    | test same      | 3 | 3 |



