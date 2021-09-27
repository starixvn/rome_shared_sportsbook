/// <reference path="Languages/en.js" />
if (typeof (Fanex) == 'undefined') { // Require Fanex namespace
    Fanex = {};
}
if (typeof (Fanex.PTEngine) == 'undefined') { // Require Fanex.PTEngine namespace
    alert('Require Fanex.PTEngine namespace');
}
if (typeof (Validators) == 'undefined') { // Require Validators library
    alert('Require validators library');
}

var VIEW_MAX_PAYOUT_SETTING_INFO_URL = typeof (top.resolveClientUrl) == 'function'
    ? top.resolveClientUrl('ViewMaxPayoutSettingInformation/Index')
    : '';

Fanex.PTEngine.BettingLimit = function (source) {
    var sportTypeIdInNumberGame = [161, 164];

    var parlaySportTypeNames = ['Mix Sports Parlay', 'Soccer Parlay'];
    var isNumberGameType = function (sportId) {
        return sportTypeIdInNumberGame.indexOf(sportId) > -1;
    };
    var hasMaxPayoutPerMatch = function (sport) {
        return !isNumberGameType(sport.id) && parlaySportTypeNames.indexOf(sport.key) == -1;
    };

    if (typeof (source) == 'object') {
        this.items = source.bettingLimitItems;
    }
    var validateExpr = /^(\$|)([0-9]\d{0,2}(\,\d{3})*|([0-9]\d*))(\.?\d*)?$/;
    this.ValidateMessage = function (elementInput, errorMessage, xpos, pointerx) {
        var isXPos = (typeof (xpos) != "undefined" && xpos != null);
        var isPointerXPos = (typeof (pointerx) != "undefined" && pointerx != null);
        if (isXPos && pointerx) {
            Validators.show(elementInput, errorMessage, xpos, pointerx);
        }
        else {
            Validators.show(elementInput, errorMessage);
        }
        Validators.animate(elementInput);
    };
    this.Validate = function (defaultMinBetValue) {
        var c = this.items.length;
        for (var i = 0; i < c; i++) {
            var item = this.items[i];
            var copiedItem = item.copiedItem;
            var elementInput = null;
            // Validate each sport type
            if (copiedItem == null) { // Copy checkbox was ticked
                var hasMaxPayoutPerMatchElement = typeof (item.maxPayoutPerMatchElement) != 'undefined';

                if (validateExpr.test(item.minBetElement.value) == false) {
                    this.ValidateMessage(item.minBetElement, Language.INCORRECT_MIN_BET);
                    return false;
                }
                if (validateExpr.test(item.maxBetElement.value) == false) {
                    this.ValidateMessage(item.maxBetElement, Language.INCORRECT_MAX_BET);
                    return false;
                }
                if (validateExpr.test(item.maxPerMatchElement.value) == false) {
                    this.ValidateMessage(item.maxPerMatchElement, Language.INCORRECT_MAX_PER_MATCH);
                    return false;
                }
                if (hasMaxPayoutPerMatchElement && !validateExpr.test(item.maxPayoutPerMatchElement.value)) {
                    this.ValidateMessage(item.maxPayoutPerMatchElement, Language.INCORRECT_MAX_PAYOUT_PER_MATCH);
                    return false;
                }

                // Check min bet < max bet < max per match
                var minBet = parseFloat(item.minBetElement.value, true);
                var maxBet = parseFloat(item.maxBetElement.value, true);
                var maxPerMatch = parseFloat(item.maxPerMatchElement.value, true);
                var maxPayoutPerMatch = hasMaxPayoutPerMatchElement ? parseFloat(item.maxPayoutPerMatchElement.value, true) : 0;

                if (minBet > maxBet) {
                    this.ValidateMessage(item.minBetElement, Language.MIN_BET_LOWER_THAN_MIN_MAX_BET.Format(item.name));
                    return false;
                }
                if (minBet > maxPerMatch) {
                    this.ValidateMessage(item.minBetElement, Language.MIN_BET_LOWER_THAN_MIN_MAX_PER_MATCH_BET.Format(item.name));
                    return false;
                }
                if (maxBet > maxPerMatch) {
                    this.ValidateMessage(item.maxBetElement, Language.MAX_BET_LOWER_THAN_MIN_MAX_PER_MATCH_BET.Format(item.name));
                    return false;
                }
                // Check minbet < minbetmax
                if (typeof (item.minBetMax) != 'undefined' && item.minBetMax > 0 && minBet < item.minBetMax && minBet != 0) {
                    this.ValidateMessage(item.minBetElement, Language.MIN_BET_GREATER_THAN_MIN_MIN_BET.Format(''.FormatNumber(item.minBetMax)));
                    return false;
                }
                // Check maxbet < maxbetmin
                if (typeof (item.maxBetMin) != 'undefined' && item.maxBetMin > 0 && maxBet > item.maxBetMin && maxBet != 0) {
                    this.ValidateMessage(item.maxBetElement, Language.MAX_BET_LOWER_THAN_MAX_MAX_BET.Format(''.FormatNumber(item.maxBetMin)));
                    return false;
                }
                // Check maxpermatch_min < maxpermatch < maxpermatch_max
                if (typeof (item.maxPerMatchMax) != 'undefined' && item.maxPerMatchMax > 0 && maxPerMatch > item.maxPerMatchMax && maxPerMatch != 0) {
                    this.ValidateMessage(item.maxPerMatchElement, Language.MAX_PER_MATCH_LOWER_THAN_MAX_PER_MATCH_MAX_BET.Format(''.FormatNumber(item.maxPerMatchMax)), -130, 160);
                    return false;
                }

                if (hasMaxPayoutPerMatchElement
                    && typeof (item.maxPayoutPerMatchMax) != 'undefined'
                    && item.maxPayoutPerMatchMax > 0
                    && maxPayoutPerMatch > item.maxPayoutPerMatchMax
                    && maxPayoutPerMatch != 0) {
                    this.ValidateMessage(
                        item.maxPayoutPerMatchElement,
                        Language.MAX_PAYOUT_PER_MATCH_LOWER_THAN_MAX_PAYOUT_PER_MATCH_MAX_BET.Format(''.FormatNumber(item.maxPayoutPerMatchMax)));
                    return false;
                }

                if (hasMaxPayoutPerMatchElement && maxPerMatch > maxPayoutPerMatch) {
                    this.ValidateMessage(
                        item.maxPerMatchElement,
                        Language.MAX_PER_MATCH_LOWER_THAN_MAX_PAYOUT_PER_MATCH_BET.Format(item.name));
                    return false;
                }

                // Check defaultMinBetValue
                if (defaultMinBetValue && (item.id === 161 || item.id === 164) && minBet < defaultMinBetValue) {
                    this.ValidateMessage(item.minBetElement, Language.MIN_BET_LOWER_THAN_DEFAULT_MIN_BET_VALUE.Format(item.name, defaultMinBetValue));
                    return false;
                }
            }
            if (item.id == 161) {
                if (validateExpr.test(item.maxPerBallElement.value) == false) {
                    this.ValidateMessage(item.maxPerBallElement, Language.INCORRECT_MAX_PER_BALL);
                    return false;
                }

                var maxBet = parseFloat(item.maxBetElement.value, true);
                var maxPerMatch = parseFloat(item.maxPerMatchElement.value, true);
                var maxPerBall = parseFloat(item.maxPerBallElement.value, true);
                // Check maxperball_min < maxperball < maxperball_max
                if (typeof (item.maxPerBallMax) != 'undefined' && item.maxPerBallMax > 0 && maxPerBall > item.maxPerBallMax && maxPerBall != 0) {
                    this.ValidateMessage(item.maxPerBallElement, Language.MAX_PER_BALL_LOWER_THAN_MAX_PER_BALL_MAX_BET.Format(''.FormatNumber(item.maxPerBallMax)), -180, 200);
                    return false;
                }

                if (maxBet > maxPerBall && maxPerBall > 0) {
                    this.ValidateMessage(item.maxBetElement, Language.MAX_BET_LOWER_THAN_MAX_PER_BALL_BET.Format(item.name));
                    return false;
                }

                if (maxPerBall > maxPerMatch && maxPerBall > 0) {
                    this.ValidateMessage(
                        item.maxPerBallElement,
                        Language.MAX_PER_BALL_LOWER_THAN_MAX_PER_MATCH_BET.Format(item.name));
                    return false;
                }
            }
        }
        // Success
        return true;
    }
    this.Save = function () {
        var bettingLimits = [];
        var c = this.items.length;
        for (var i = 0; i < c; i++) {
            var item = this.items[i];
            var bettingLimitItem = null;
            var copiedItem = item.copiedItem;
            if (copiedItem != null) { // Copy checkbox was ticked
                bettingLimitItem = {
                    id: parseInt(item.id),
                    key: item.key,
                    MinBet: Fanex.RoundNumber(parseFloat(this.items[copiedItem.id].minBetElement.value, true), 1),
                    MaxBet: Fanex.RoundNumber(parseFloat(this.items[copiedItem.id].maxBetElement.value, true), 1),
                    MaxPerMatch: Fanex.RoundNumber(parseFloat(this.items[copiedItem.id].maxPerMatchElement.value, true), 1)
                };

                if (typeof (this.items[copiedItem.id].maxPayoutPerMatchElement) != 'undefined'
                    && typeof (item.maxPayoutPerMatchElement) != 'undefined') {
                    bettingLimitItem.MaxPayoutPerMatch = Fanex.RoundNumber(parseFloat(this.items[copiedItem.id].maxPayoutPerMatchElement.value, true), 1);
                }
            } else {
                bettingLimitItem = {
                    id: parseInt(item.id),
                    key: item.key,
                    MinBet: Fanex.RoundNumber(parseFloat(item.minBetElement.value, true), 1),
                    MaxBet: Fanex.RoundNumber(parseFloat(item.maxBetElement.value, true), 1),
                    MaxPerMatch: Fanex.RoundNumber(parseFloat(item.maxPerMatchElement.value, true), 1)
                };

                if (typeof (item.maxPayoutPerMatchElement) != 'undefined') {
                    bettingLimitItem.MaxPayoutPerMatch = Fanex.RoundNumber(parseFloat(item.maxPayoutPerMatchElement.value, true), 1);
                }
            }
            if (item.id == 161) {
                bettingLimitItem.MaxPerBall = Fanex.RoundNumber(parseFloat(item.maxPerBallElement.value, true), 1);
            }
            bettingLimits[i] = bettingLimitItem;
        }
        return {
            BettingLimitItems: bettingLimits
        };
    }

    this.AddMaxPayoutDetailIcon = function (headerElement) {
        var link = document.createElement('a');
        link.href = VIEW_MAX_PAYOUT_SETTING_INFO_URL;
        link.target = '_blank';

        var detailIcon = document.createElement('span');
        detailIcon.className = 'bet-type-detail-icon sport-type-detail-icon';

        link.appendChild(detailIcon);
        headerElement.appendChild(link);
    };

    this.AddDetailIcon = function (headerElement) {
        var me = this;

        var content = '<div><b>' + Language.MIXSPORTPARLAY + ': &nbsp;</b>' + Language.MIXSPROTPARLAYHINT1 + '</div>';
        content = content + '<div >' + Language.MIXSPROTPARLAYHINT2 + '</div>';

        var detailIcon = document.createElement("SPAN");
        detailIcon.className = "bet-type-detail-icon sport-type-detail-icon";
        headerElement.appendChild(detailIcon);

        var topPosition = 38
        detailIcon.onclick = function () {
            var currentIconPos = Validators.utils.findPos(detailIcon),
                currentBoxHeight = topPosition;
            me.showOnTop = currentIconPos[1] > topPosition + 30;
            if (me.showOnTop && Validators.isTooltipShow) {
                Validators.hide(false);
                Validators.isTooltipShow = false;
            }
            else if (!me.showOnTop && Validators.isTooltipDownShow) {
                Validators.hide(true);
                Validators.isTooltipDownShow = false;
            }
            else {
                Validators.show(
                    detailIcon,
                    content,
                    0,
                    10,
                    -topPosition - 25,
                    topPosition + 20,
                    topPosition,
                    60000);
                Validators.isTooltipShow = true;
            }
        };
    };

    this.Render = function (owner, hideTextBox) {
        var box = document.createElement("DIV");
        // Create MinBet, MaxBet, MaxPerMatch header
        var emptyBox = document.createElement("DIV");
        emptyBox.innerHTML = "&nbsp;";
        emptyBox.className = "BettingLimitHeader";
        box.appendChild(emptyBox);
        var minBetHeader = document.createElement("DIV");
        minBetHeader.innerHTML = Language.MIN_BET;
        minBetHeader.className = "BettingLimitHeaderTop9";
        box.appendChild(minBetHeader);
        var maxBetHeader = document.createElement("DIV");
        maxBetHeader.innerHTML = Language.MAX_BET;
        maxBetHeader.className = "BettingLimitHeaderTop9";
        box.appendChild(maxBetHeader);
        var maxPerMatchHeader = document.createElement("DIV");
        maxPerMatchHeader.innerHTML = Language.MAX_PER_MATCH;
        maxPerMatchHeader.className = "BettingLimitHeaderTop9";
        box.appendChild(maxPerMatchHeader);

        var maxPayoutPerMatchHeader = document.createElement("DIV");
        maxPayoutPerMatchHeader.innerHTML = Language.MAX_PAYOUT_PER_MATCH;
        maxPayoutPerMatchHeader.className = "BettingLimitHeaderTop9";
        this.AddMaxPayoutDetailIcon(maxPayoutPerMatchHeader);
        box.appendChild(maxPayoutPerMatchHeader);

        var clear = document.createElement("DIV");
        clear.style.clear = "both";
        box.appendChild(clear);
        var showLimitBox = false;
        var c = this.items.length;
        for (var i = 0; i < c; i++) {
            var item = this.items[i];
            var box2 = document.createElement("DIV");
            if (typeof (item.minBet) == 'undefined') { // For Add new case
                item.minBet = item.minBetMax;
            }
            if (typeof (item.maxBet) == 'undefined') { // For Add new case
                item.maxBet = item.maxBetMin;
            }
            if (typeof (item.maxPerMatch) == 'undefined') { // For Add new case
                item.maxPerMatch = item.maxPerMatchMax;
            }
            if (typeof (item.maxPayoutPerMatch) == 'undefined') { // For Add new case
                item.maxPayoutPerMatch = item.maxPayoutPerMatchMax;
            }
            if (typeof (item.maxPerBall) == 'undefined' && item.id == 161) { // For Add new case
                item.maxPerBall = item.maxPerBallMax;
            }
            var showLimitBox = typeof (item.maxBetMin) != 'undefined';

            // Hard-code for max per ball of number game
            if (item.id == 161) {
                var headerNumberGame = document.createElement("DIV");
                headerNumberGame.className = "BettingLimitHeader";
                headerNumberGame.innerHTML = "&nbsp;";
                box.appendChild(headerNumberGame);

                // Create MinBet, MaxBet, MaxPerMatch header
                var minBetHeader161 = document.createElement("DIV");
                minBetHeader161.innerHTML = Language.MIN_BET;
                minBetHeader161.className = (showLimitBox || hideTextBox) ? "BettingLimitHeaderTop9" : "BettingLimitHeaderTop5";
                box.appendChild(minBetHeader161);
                var maxBetHeader161 = document.createElement("DIV");
                maxBetHeader161.innerHTML = Language.MAX_BET;
                maxBetHeader161.className = (showLimitBox || hideTextBox) ? "BettingLimitHeaderTop9" : "BettingLimitHeaderTop5";
                box.appendChild(maxBetHeader161);
                var maxPerMatchHeader161 = document.createElement("DIV");
                maxPerMatchHeader161.innerHTML = Language.MAX_PER_MATCH;
                maxPerMatchHeader161.className = (showLimitBox || hideTextBox) ? "BettingLimitHeaderTop9" : "BettingLimitHeaderTop5";
                box.appendChild(maxPerMatchHeader161);
                var maxPerBallHeader161 = document.createElement("DIV");
                maxPerBallHeader161.innerHTML = Language.MAX_PER_BALL;
                maxPerBallHeader161.className = (showLimitBox || hideTextBox) ? "BettingLimitHeaderTop9" : "BettingLimitHeaderTop5";
                box.appendChild(maxPerBallHeader161);

                // Create Number game header
                var clear = document.createElement("DIV");
                clear.style.clear = "both";
                box.appendChild(clear);
            }

            var header = document.createElement("DIV");
            header.innerHTML = item.name;
            header.className = "BettingLimitHeader";
            item.header = header;
            if (item.key == "Mix Sports Parlay") {
                this.AddDetailIcon(header);
            }

            box2.appendChild(header);

            // Current value
            // Show label instead to TextBox
            if (hideTextBox) {
                var minBetBox = document.createElement("DIV");
                minBetBox.innerHTML = ''.FormatNumber(item.minBet);
                minBetBox.className = "BettingLimitLabel1";
                box2.appendChild(minBetBox);
                minBetHeader.className = "BettingLimitHeaderTop9";
            }
            else {
                var minBetBox = document.createElement("DIV");
                var minBet = document.createElement("INPUT");
                minBet.type = "text";
                minBet.maxLength = 14;
                minBet.onkeyup = function (event) { Fanex.FormatNumber(event, true); };
                minBet.className = "BettingLimitTextBox9";
                minBet.value = ''.FormatNumber(item.minBet);
                minBetBox.appendChild(minBet);
                minBetBox.className = "BettingLimitItem9";
                box2.appendChild(minBetBox);
                item.minBetElement = minBet;
                // Limit box
                var minBetMax = document.createElement("DIV");
                if (showLimitBox) {
                    minBetMax.innerHTML = item.minBetMax == 0 ? '' : '>='.FormatNumber(item.minBetMax);
                    minBetMax.className = "BettingLimitItem92";
                    box2.appendChild(minBetMax);
                } else {
                    minBet.className = "BettingLimitTextBox5";
                    minBetBox.className = "BettingLimitItem5";
                    minBetHeader.className = "BettingLimitHeaderTop5";
                }
            }

            // Current value
            // Show label instead to TextBox
            if (hideTextBox) {
                var maxBetBox = document.createElement("DIV");
                maxBetBox.innerHTML = ''.FormatNumber(item.maxBet);
                maxBetBox.className = "BettingLimitLabel1";
                box2.appendChild(maxBetBox);
                maxBetHeader.className = "BettingLimitHeaderTop9";
            }
            else {
                var maxBetBox = document.createElement("DIV");
                var maxBet = document.createElement("INPUT");
                maxBet.type = "text";
                maxBet.maxLength = 14;
                maxBet.onkeyup = function (event) { Fanex.FormatNumber(event, true); };
                maxBet.className = "BettingLimitTextBox9";
                maxBet.value = ''.FormatNumber(item.maxBet);
                maxBetBox.appendChild(maxBet);
                maxBetBox.className = "BettingLimitItem9";
                box2.appendChild(maxBetBox);
                item.maxBetElement = maxBet;
                // Limit box
                var maxBetMin = document.createElement("DIV");
                if (showLimitBox) {
                    maxBetMin.innerHTML = item.maxBetMin == 0 ? '' : '<='.FormatNumber(item.maxBetMin);
                    maxBetMin.className = "BettingLimitItem92";
                    box2.appendChild(maxBetMin);
                } else {
                    maxBet.className = "BettingLimitTextBox5";
                    maxBetBox.className = "BettingLimitItem5";
                    maxBetHeader.className = "BettingLimitHeaderTop5";
                }
            }

            // Current value
            // Show label instead to TextBox
            if (hideTextBox) {
                var maxPerMatchBox = document.createElement("DIV");
                maxPerMatchBox.innerHTML = ''.FormatNumber(item.maxPerMatch);
                maxPerMatchBox.className = "BettingLimitLabel1";
                box2.appendChild(maxPerMatchBox);
                maxPerMatchHeader.className = "BettingLimitHeaderTop9";

                if (sportTypeIdInNumberGame.indexOf(item.id) >= 0) {
                    minBetBox.className = maxBetBox.className = maxPerMatchBox.className = "BettingLimitLabel1";

                    var maxPerBallBox = document.createElement("DIV");
                    maxPerBallBox.className = "BettingLimitLabel1";
                    if (typeof (item.maxPerBall) != 'undefined') {
                        maxPerBallBox.innerHTML = ''.FormatNumber(item.maxPerBall);
                    }
                    box2.appendChild(maxPerBallBox);
                }
            }
            else {
                var maxPerMatchBox = document.createElement("DIV");
                var maxPerMatch = document.createElement("INPUT");
                maxPerMatch.type = "text";
                maxPerMatch.maxLength = 14;
                maxPerMatch.onkeyup = function (event) { Fanex.FormatNumber(event, true); };
                maxPerMatch.className = "BettingLimitTextBox9";
                maxPerMatch.value = ''.FormatNumber(item.maxPerMatch);
                maxPerMatchBox.appendChild(maxPerMatch);
                maxPerMatchBox.className = "BettingLimitItem9";
                box2.appendChild(maxPerMatchBox);
                item.maxPerMatchElement = maxPerMatch;
                // Limit box
                var maxPerMatchMax = document.createElement("DIV");
                if (showLimitBox) {
                    maxPerMatchMax.innerHTML = item.maxPerMatchMax == 0 ? '' : '<='.FormatNumber(item.maxPerMatchMax);
                    maxPerMatchMax.className = "BettingLimitItem92";
                    box2.appendChild(maxPerMatchMax);
                } else {
                    maxPerMatch.className = "BettingLimitTextBox5";
                    maxPerMatchBox.className = "BettingLimitItem5";
                    maxPerMatchHeader.className = "BettingLimitHeaderTop5";
                }

                if (sportTypeIdInNumberGame.indexOf(item.id) >= 0) {
                    minBet.className = showLimitBox ? 'BettingLimitTextBox9' : 'BettingLimitTextBox5';
                    minBetBox.className = showLimitBox ? 'BettingLimitItem9' : 'BettingLimitItem5';
                    minBetMax.className = "BettingLimitItem92";
                    maxBet.className = showLimitBox ? 'BettingLimitTextBox9' : 'BettingLimitTextBox5';
                    maxBetBox.className = showLimitBox ? 'BettingLimitItem9' : 'BettingLimitItem5';
                    maxBetMin.className = "BettingLimitItem92";
                    maxPerMatch.className = showLimitBox ? 'BettingLimitTextBox9' : 'BettingLimitTextBox5';
                    maxPerMatchBox.className = showLimitBox ? 'BettingLimitItem9' : 'BettingLimitItem5';
                    maxPerMatchMax.className = "BettingLimitItem92";
                    if (typeof (item.maxPerBall) != 'undefined') {
                        // Max Per Ball
                        var maxPerBallBox = document.createElement("DIV");
                        var maxPerBall = document.createElement("INPUT");
                        maxPerBall.type = "text";
                        maxPerBall.maxLength = 14;
                        maxPerBall.onkeyup = function (event) { Fanex.FormatNumber(event, true); };
                        maxPerBall.className = showLimitBox ? 'BettingLimitTextBox9' : 'BettingLimitTextBox5';
                        maxPerBall.value = ''.FormatNumber(item.maxPerBall);
                        maxPerBallBox.appendChild(maxPerBall);
                        maxPerBallBox.className = showLimitBox ? 'BettingLimitItem9' : 'BettingLimitItem5';
                        box2.appendChild(maxPerBallBox);
                        item.maxPerBallElement = maxPerBall;
                        // Limit box
                        var maxPerBallMax = document.createElement("DIV");
                        if (showLimitBox) {
                            maxPerBallMax.innerHTML = item.maxPerBallMax == 0 ? '' : '<='.FormatNumber(item.maxPerBallMax);
                            maxPerBallMax.className = "BettingLimitItem92";
                            box2.appendChild(maxPerBallMax);
                        }
                    } else {
                        var maxPerBallBox = document.createElement("DIV");
                        maxPerBallBox.className = showLimitBox ? 'BettingLimitItem9' : 'BettingLimitItem5';
                        box2.appendChild(maxPerBallBox);
                        if (showLimitBox) {
                            var maxPerBallMax = document.createElement("DIV");
                            maxPerBallMax.className = "BettingLimitItem92";
                            box2.appendChild(maxPerBallMax);
                        }
                    }
                }
            }

            if (hideTextBox && !isNumberGameType(item.id)) {
                var maxPayoutPerMatchBox = document.createElement("DIV");
                maxPayoutPerMatchBox.innerHTML = !hasMaxPayoutPerMatch(item) ? '' : ''.FormatNumber(item.maxPayoutPerMatch);
                maxPayoutPerMatchBox.className = "BettingLimitLabel1";
                box2.appendChild(maxPayoutPerMatchBox);
                maxPayoutPerMatchHeader.className = "BettingLimitHeaderTop9";
            }

            if (!hideTextBox && !isNumberGameType(item.id)) {
                var maxPayoutPerMatchBox = document.createElement("DIV");
                var maxPayoutPerMatch = document.createElement("INPUT");
                maxPayoutPerMatch.type = "text";
                maxPayoutPerMatch.maxLength = 14;
                maxPayoutPerMatch.onkeyup = function (event) { Fanex.FormatNumber(event, true); };
                maxPayoutPerMatch.className = "BettingLimitTextBox9";
                maxPayoutPerMatch.value = ''.FormatNumber(item.maxPayoutPerMatch);

                if (hasMaxPayoutPerMatch(item)) {
                    maxPayoutPerMatchBox.appendChild(maxPayoutPerMatch);
                    item.maxPayoutPerMatchElement = maxPayoutPerMatch;
                }

                maxPayoutPerMatchBox.className = "BettingLimitItem9";
                box2.appendChild(maxPayoutPerMatchBox);

                var maxPayoutPerMatchMax = document.createElement("DIV");
                if (showLimitBox) {
                    maxPayoutPerMatchMax.innerHTML = !hasMaxPayoutPerMatch(item) || item.maxPayoutPerMatchMax == 0 ? '' : '<='.FormatNumber(item.maxPayoutPerMatchMax);
                    maxPayoutPerMatchMax.className = "BettingLimitItem92";
                    box2.appendChild(maxPayoutPerMatchMax);
                } else {
                    maxPayoutPerMatch.className = "BettingLimitTextBox5";
                    maxPayoutPerMatchBox.className = "BettingLimitItem5";
                    maxPayoutPerMatchHeader.className = "BettingLimitHeaderTop5";
                }
            }

            item.element = box2;
            box.appendChild(box2);
            var clear = document.createElement("DIV");
            clear.style.clear = "both";
            box.appendChild(clear);
        }
        box.className = (showLimitBox || hideTextBox) ? "BettingLimit" : "BettingLimit4";
        if (typeof (owner) == 'object') {
            if (!hideTextBox) {
                var headerSoccer = this.items[0].header;
                var headerBasketBall = this.items[2].header;
                var numberGame = this.items[10].header;
                headerSoccer.className = headerBasketBall.className = numberGame.className = "BettingLimitHeaderCopied";
                headerSoccer.title = Language.COPY_ALL_BETTING_LIMIT_FROM.Format(Language.SOCCER);
                headerBasketBall.title = Language.COPY_ALL_BETTING_LIMIT_FROM.Format(Language.BASKETBALL);
                numberGame.title = Language.COPY_ALL_BETTING_LIMIT_OF_NUMBERGAME;
                var items = this.items;
                items[0].active = items[1].active = items[2].active = items[10].active = false;
                // Handle event copy from soccer
                headerSoccer.onclick = function () {
                    var c = items.length - 2;
                    if (items[0].active === false) { // Uncheck --> Checked
                        items[0].active = true;
                        headerSoccer.className = "BettingLimitHeaderCopiedActive";
                        if (items[2].active === true) { // Untick basket ball
                            items[2].active = false;
                            headerBasketBall.className = "BettingLimitHeaderCopied";
                        }
                        for (var i = 1; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = {
                                id: 0
                            }; // Copied from Soccer, using index

                            item.inactive = true;
                            Fanex.PTEngine.DisableChildren(item.element, "BetTypeInactive");
                        }
                    } else {
                        items[0].active = false;
                        headerSoccer.className = "BettingLimitHeaderCopied";
                        for (var i = 1; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = null; // Remove copiedItem
                            if (item.inactive === false) break;
                            item.inactive = false;
                            Fanex.PTEngine.ReEnableChildren(item.element);
                        }
                    }
                }
                // Handle event copy from basket ball
                headerBasketBall.onclick = function () {
                    // Enable Soccer-Parlay for edit
                    items[1].active = false;
                    Fanex.PTEngine.RemoveDisableChildren(items[1].element);

                    if (items[2].inactive == true) { // Re-enable current
                        items[2].inactive = false;
                        items[2].copiedItem = null; // Remove copiedItem
                        Fanex.PTEngine.ReEnableChildren(items[2].element);
                    }
                    var c = items.length - 2;
                    if (items[2].active === false) { // Uncheck --> Checked
                        items[2].active = true;
                        headerBasketBall.className = "BettingLimitHeaderCopiedActive";
                        if (items[0].active === true) { // Untick soccer
                            items[0].active = false;
                            headerSoccer.className = "BettingLimitHeaderCopied";
                        }

                        items[1].active = false;
                        items[1].copiedItem = null;

                        for (var i = 3; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = {
                                id: 2
                            }; // Copied from Basketball, using index

                            item.inactive = true;
                            Fanex.PTEngine.DisableChildren(item.element, "BetTypeInactive");
                        }
                    } else {
                        items[2].active = false;
                        headerBasketBall.className = "BettingLimitHeaderCopied";
                        for (var i = 3; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = null; // Remove copiedItem
                            if (item.inactive === false) break;
                            item.inactive = false;
                            Fanex.PTEngine.ReEnableChildren(item.element);
                        }
                    }
                }

                // Handle event copy from Number game
                numberGame.onclick = function () {
                    var c = items.length;
                    if (items[10].active === false) { // Uncheck --> Checked
                        items[10].active = true;
                        numberGame.className = "BettingLimitHeaderCopiedActive";

                        for (var i = 11; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = {
                                id: 10
                            }; // Copied from Number game, using index

                            item.inactive = true;
                            Fanex.PTEngine.DisableChildren(item.element, "BetTypeInactive");
                        }
                    } else {
                        items[10].active = false;
                        numberGame.className = "BettingLimitHeaderCopied";
                        for (var i = 11; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = null; // Remove copiedItem
                            if (item.inactive === false) break;
                            item.inactive = false;
                            Fanex.PTEngine.ReEnableChildren(item.element);
                        }
                    }
                }
            }
            owner.appendChild(box);
        }
        return box;
    }
}