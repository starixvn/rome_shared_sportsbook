// Test PT: M99RM02001
var pt = {
    s4: 0.85,
    s3: 0,
    s1: 0.3,
    m4: 0.8,
    m3: 0.8,
    m2: 0,
    m1: 0.5,
    a4: 0.8,
    a2: 0.6,
    a1: 0.03,
    us3: 0,
    us1: 0.3,
    is3: false,
    is1: true,
    um2: 0.2,
    um1: 0.1,
    im2: false,
    im1: true,
    n4: 0.1,
    n3: 0.2,
    n2: 0.03,
    l4: 0.85,
    l3: 0.8,
    l2: 0.79
};
var bettingLimits2 = {
    "bettingLimitItems": [{
        "id": 1,
        "name": "Soccer",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 2,
        "name": "Basketball",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 3,
        "name": "Football",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 5,
        "name": "Tennis",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 8,
        "name": "Baseball",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 10,
        "name": "Golf",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 11,
        "name": "Moto Sports",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 99,
        "name": "Other Sports",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }, {
        "id": 99,
        "name": "Mix Sports Parlay",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000,
        "minBetMax": 11.0000,
        "maxBetMin": 700.0000,
        "maxPerMatchMin": 0.0000,
        "maxPerMatchMax": 10000.0000
    }]
};
var bettingLimits = {
    "bettingLimitItems": [{
        "id": 1,
        "name": "Soccer",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 2,
        "name": "Basketball",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 3,
        "name": "Football",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 5,
        "name": "Tennis",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 8,
        "name": "Baseball",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 10,
        "name": "Golf",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 11,
        "name": "Moto Sports",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 99,
        "name": "Other Sports",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }, {
        "id": 99,
        "name": "Mix Sports Parlay",
        "minBet": 11.0000,
        "maxBet": 700.0000,
        "maxPerMatch": 10000.0000
    }]
};
var grid = {
    name: 'ptGrid1',
    sportTypes: [{
        id: 1,
        name: 'Soccer',
        collapsed: false,
        betTypeGroupSets: [{
            isLive: false,
            showGroupSetLabel: true,
            betTypeGroups: [{
                id: 1,
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 7,
                    name: '1st Hdp',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 8,
                    name: '1st OU',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 2,
                    name: 'Odd/Even',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 99,
                    name: 'Odd/Even',
                    minWidth: 90,
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }, {
                id: 2,
                betTypes: [{
                    id: 5,
                    name: '1X2',
                    pt: pt
                }, {
                    id: 4,
                    name: 'Correct Score',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 6,
                    name: 'Total Goal',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 9,
                    name: 'Mix Parlay',
                    minWidth: 90,
                    pt: pt
                }, {
                    id: 10,
                    name: 'Outright',
                    minWidth: 90,
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }, {
            isLive: true,
            showGroupSetLabel: true,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    minWidth: 122,
                    pt: pt
                }, {
                    id: 7,
                    name: '1st Hdp',
                    minWidth: 122,
                    pt: pt
                }, {
                    id: 8,
                    name: '1st OU',
                    minWidth: 121,
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 2,
        name: 'Basketball',
        collapsed: false,
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    pt: pt
                }, {
                    id: 2,
                    name: 'Odd/Even',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 3,
        name: 'Football',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    pt: pt
                }, {
                    id: 2,
                    name: 'Odd/Even',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 5,
        name: 'Tennis',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    pt: pt
                }, {
                    id: 2,
                    name: 'Odd/Even',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 8,
        name: 'Baseball',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 10,
        name: 'Golf',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    pt: pt
                }, {
                    id: 2,
                    name: 'Odd/Even',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 11,
        name: 'Moto Sports',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 99,
        name: 'Other Sports',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 1,
                    name: 'Handicap',
                    pt: pt
                }, {
                    id: 3,
                    name: 'Over/Under',
                    pt: pt
                }, {
                    id: 2,
                    name: 'Odd/Even',
                    pt: pt
                }, {
                    id: 20,
                    name: 'Money Line',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }, {
        id: 99,
        name: 'Mix Sports Parlay',
        betTypeGroupSets: [{
            isLive: false,
            betTypeGroups: [{
                betTypes: [{
                    id: 9,
                    name: 'Mix Parlay',
                    pt: pt,
                    showDetailIcon: true,
                    representForBettypes: [
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        },
                        {
                            id: 1,
                            name: "New Bet Type"
                        }
                    ]
                }]
            }]
        }]
    }]
}