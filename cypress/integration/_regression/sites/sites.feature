Feature: Site selection feature

  I can select a site after login

  Background: I login namechecker
    Given I login
    And I authorize an app integration

  Scenario: Select site add filter and change site
    When I select site "SITE_ONE"
    And I set a filter with option "Begins with" operator "Equal to" text "test" in row "0"
    And I apply a filter
    And I want to change the site
    And I select site "SITE_TWO"
    Then The filter is applied to option "Begins with" operator "=" text "test"
