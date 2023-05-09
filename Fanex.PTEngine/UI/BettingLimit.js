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
                item.maxPayoutPerMatch = item.maxPayoutPerMatchMax;            }
        
            var showLimitBox = typeof (item.maxBetMin) != 'undefined';

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
            }

            if (hideTextBox) {
                var maxPayoutPerMatchBox = document.createElement("DIV");
                maxPayoutPerMatchBox.innerHTML = ''.FormatNumber(item.maxPayoutPerMatch);
                maxPayoutPerMatchBox.className = "BettingLimitLabel1";
                box2.appendChild(maxPayoutPerMatchBox);
                maxPayoutPerMatchHeader.className = "BettingLimitHeaderTop9";
            }

            if (!hideTextBox) {
                var maxPayoutPerMatchBox = document.createElement("DIV");
                var maxPayoutPerMatch = document.createElement("INPUT");
                maxPayoutPerMatch.type = "text";
                maxPayoutPerMatch.maxLength = 14;
                maxPayoutPerMatch.onkeyup = function (event) { Fanex.FormatNumber(event, true); };
                maxPayoutPerMatch.className = "BettingLimitTextBox9";
                maxPayoutPerMatch.value = ''.FormatNumber(item.maxPayoutPerMatch);
                maxPayoutPerMatchBox.appendChild(maxPayoutPerMatch);
                maxPayoutPerMatchBox.className = "BettingLimitItem9";
                box2.appendChild(maxPayoutPerMatchBox);
                item.maxPayoutPerMatchElement = maxPayoutPerMatch;

                var maxPayoutPerMatchMax = document.createElement("DIV");
                if (showLimitBox) {
                    maxPayoutPerMatchMax.innerHTML = item.maxPayoutPerMatchMax == 0 ? '' : '<='.FormatNumber(item.maxPayoutPerMatchMax);
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
                var headerBasketBall = this.items[3].header;
                headerSoccer.className = headerBasketBall.className = "BettingLimitHeaderCopied";
                headerSoccer.title = Language.COPY_ALL_BETTING_LIMIT_FROM.Format(Language.SOCCER);
                headerBasketBall.title = Language.COPY_ALL_BETTING_LIMIT_FROM.Format(Language.BASKETBALL);             
                var items = this.items;
                items[0].active = items[1].active = items[2].active = items[3].active = false;
                // Handle event copy from soccer
                headerSoccer.onclick = function () {
                    var c = items.length;
                    if (items[0].active === false) { // Uncheck --> Checked
                        items[0].active = true;
                        headerSoccer.className = "BettingLimitHeaderCopiedActive";
                        if (items[3].active === true) { // Untick basket ball
                            items[3].active = false;
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
                    // Enable Soccer-Saba for edit
                    items[1].active = false;
                    Fanex.PTEngine.RemoveDisableChildren(items[1].element);
                    // Enable Soccer-Parlay for edit
                    items[2].active = false;
                    Fanex.PTEngine.RemoveDisableChildren(items[2].element);

                    if (items[3].inactive == true) { // Re-enable current
                        items[3].inactive = false;
                        items[3].copiedItem = null; // Remove copiedItem
                        Fanex.PTEngine.ReEnableChildren(items[3].element);
                    }
                    var c = items.length;
                    if (items[3].active === false) { // Uncheck --> Checked
                        items[3].active = true;
                        headerBasketBall.className = "BettingLimitHeaderCopiedActive";
                        if (items[0].active === true) { // Untick soccer
                            items[0].active = false;
                            headerSoccer.className = "BettingLimitHeaderCopied";
                        }

                        items[1].active = false;
                        items[1].copiedItem = null;
                        items[2].active = false;
                        items[2].copiedItem = null;

                        for (var i = 4; i < c; i++) {
                            var item = items[i];
                            item.copiedItem = {
                                id: 3
                            }; // Copied from Basketball, using index

                            item.inactive = true;
                            Fanex.PTEngine.DisableChildren(item.element, "BetTypeInactive");
                        }
                    } else {
                        items[3].active = false;
                        headerBasketBall.className = "BettingLimitHeaderCopied";
                        for (var i = 4; i < c; i++) {
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