import { a7 as bind_props, a9 as escape_html, $ as attr, ae as store_get, ag as store_mutate, a4 as ensure_array_like, ah as store_set, ab as stringify$1, af as unsubscribe_stores, aa as attr_class, a6 as spread_props, T as derived, a2 as attributes, E as run, a3 as clsx$1, a8 as props_id } from './server.js-CPNQ0GBv.js';
import { t as tick } from './index-server.js-C9rOfj9g.js';
import { u as useId, n as noop, w as watch, a3 as resolveLocaleProp, C as Context, o as DOMContext, a4 as isValidIndex, r as afterTick, z as ARROW_DOWN, x as ARROW_UP, v as ARROW_LEFT, y as ARROW_RIGHT, t as ENTER, a5 as chunk, a6 as isBrowser, N as isHTMLElement } from './scroll-lock.js-DAwGTwcu.js';
import { a as toast } from './toast-state.svelte.js-B2UfxrKz.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { B as Badge_check } from './badge-check.js-Dc-hXwTK.js';
import { C as Check, M as Minus } from './minus.js-ESxlDJzH.js';
import { C as Chevron_down } from './chevron-down.js-ol8PFekw.js';
import { C as Chevron_left } from './chevron-left.js-Dl5KW7W_.js';
import { C as Chevron_right } from './chevron-right.js-ChVD6BGK.js';
import { S as SelectComp } from './Errors.js-PqimIvij.js';
import { P as Popover, c as Checkbox$1, a as Popover_trigger, b as Popover_content, C as Chevrons_up_down } from './popover.js-CeZILK5T.js';
import { C as Circle_alert } from './circle-alert.js-BYQ_-QxX.js';
import { L as Loader, S as Scroll_area } from './scroll-area.js-DLUPG4gi.js';
import { T as Textarea, C as Command, a as Command_input, b as Command_list, c as Command_empty, d as Command_group, e as Command_item } from './command.js-CqffWVq4.js';
import { X } from './dialog.js-BhMsigOw.js';
import { c as createBitsAttrs, b as boxWith, a as attachRef, n as mergeProps, d as boolToEmptyStrOrUndef, v as createId, e as boolToStr } from './create-id.js-DpR0oe6q.js';
import './sr-only-styles.js-P-cDEe1k.js';
import { L as Label } from './label.js-FcotYhKU.js';
import { c as cn } from './utils2.js-BChetszu.js';
import { B as Button, b as buttonVariants } from './button.js-DMlVoc1I.js';
import { I as Input } from './input.js-BYtfwuM9.js';
import { s as selectItem } from './global.svelte.js-Bc9BkX_a.js';
import './exports.js-BT-QlP_6.js';
import './client.js-7a-rpZlk.js';
import { d as fileProxy, e as filesProxy } from './client2.js--SBYKgBt.js';
import imageCompression from 'browser-image-compression';

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $09ec6a572d60460f$export$842a2cf37af977e1(amount, numerator) {
    return amount - numerator * Math.floor(amount / numerator);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from ICU.
// Original licensing can be found in the NOTICE file in the root directory of this source tree.


const $93635573935797de$var$EPOCH = 1721426; // 001/01/03 Julian C.E.
function $93635573935797de$export$f297eb839006d339(era, year, month, day) {
    year = $93635573935797de$export$c36e0ecb2d4fa69d(era, year);
    let y1 = year - 1;
    let monthOffset = -2;
    if (month <= 2) monthOffset = 0;
    else if ($93635573935797de$export$553d7fa8e3805fc0(year)) monthOffset = -1;
    return $93635573935797de$var$EPOCH - 1 + 365 * y1 + Math.floor(y1 / 4) - Math.floor(y1 / 100) + Math.floor(y1 / 400) + Math.floor((367 * month - 362) / 12 + monthOffset + day);
}
function $93635573935797de$export$553d7fa8e3805fc0(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function $93635573935797de$export$c36e0ecb2d4fa69d(era, year) {
    return era === 'BC' ? 1 - year : year;
}
function $93635573935797de$export$4475b7e617eb123c(year) {
    let era = 'AD';
    if (year <= 0) {
        era = 'BC';
        year = 1 - year;
    }
    return [
        era,
        year
    ];
}
const $93635573935797de$var$daysInMonth = {
    standard: [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ],
    leapyear: [
        31,
        29,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ]
};
class $93635573935797de$export$80ee6245ec4f29ec {
    fromJulianDay(jd) {
        let jd0 = jd;
        let depoch = jd0 - $93635573935797de$var$EPOCH;
        let quadricent = Math.floor(depoch / 146097);
        let dqc = ($09ec6a572d60460f$export$842a2cf37af977e1)(depoch, 146097);
        let cent = Math.floor(dqc / 36524);
        let dcent = ($09ec6a572d60460f$export$842a2cf37af977e1)(dqc, 36524);
        let quad = Math.floor(dcent / 1461);
        let dquad = ($09ec6a572d60460f$export$842a2cf37af977e1)(dcent, 1461);
        let yindex = Math.floor(dquad / 365);
        let extendedYear = quadricent * 400 + cent * 100 + quad * 4 + yindex + (cent !== 4 && yindex !== 4 ? 1 : 0);
        let [era, year] = $93635573935797de$export$4475b7e617eb123c(extendedYear);
        let yearDay = jd0 - $93635573935797de$export$f297eb839006d339(era, year, 1, 1);
        let leapAdj = 2;
        if (jd0 < $93635573935797de$export$f297eb839006d339(era, year, 3, 1)) leapAdj = 0;
        else if ($93635573935797de$export$553d7fa8e3805fc0(year)) leapAdj = 1;
        let month = Math.floor(((yearDay + leapAdj) * 12 + 373) / 367);
        let day = jd0 - $93635573935797de$export$f297eb839006d339(era, year, month, 1) + 1;
        return new ($2aaf608024c21ca1$export$99faa760c7908e4f)(era, year, month, day);
    }
    toJulianDay(date) {
        return $93635573935797de$export$f297eb839006d339(date.era, date.year, date.month, date.day);
    }
    getDaysInMonth(date) {
        return $93635573935797de$var$daysInMonth[$93635573935797de$export$553d7fa8e3805fc0(date.year) ? 'leapyear' : 'standard'][date.month - 1];
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMonthsInYear(date) {
        return 12;
    }
    getDaysInYear(date) {
        return $93635573935797de$export$553d7fa8e3805fc0(date.year) ? 366 : 365;
    }
    getMaximumMonthsInYear() {
        return 12;
    }
    getMaximumDaysInMonth() {
        return 31;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getYearsInEra(date) {
        return 9999;
    }
    getEras() {
        return [
            'BC',
            'AD'
        ];
    }
    isInverseEra(date) {
        return date.era === 'BC';
    }
    balanceDate(date) {
        if (date.year <= 0) {
            date.era = date.era === 'BC' ? 'AD' : 'BC';
            date.year = 1 - date.year;
        }
    }
    constructor(){
        this.identifier = 'gregory';
    }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Data from https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/weekData.json
// Locales starting on Sunday have been removed for compression.
const $d2ca8165c9aa885a$export$7a5acbd77d414bd9 = {
    '001': 1,
    AD: 1,
    AE: 6,
    AF: 6,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AT: 1,
    AU: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BY: 1,
    CH: 1,
    CL: 1,
    CM: 1,
    CN: 1,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    HR: 1,
    HU: 1,
    IE: 1,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JO: 6,
    KG: 1,
    KW: 6,
    KZ: 1,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MK: 1,
    MN: 1,
    MQ: 1,
    MV: 5,
    MY: 1,
    NL: 1,
    NO: 1,
    NZ: 1,
    OM: 6,
    PL: 1,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SD: 6,
    SE: 1,
    SI: 1,
    SK: 1,
    SM: 1,
    SY: 6,
    TJ: 1,
    TM: 1,
    TR: 1,
    UA: 1,
    UY: 1,
    UZ: 1,
    VA: 1,
    VN: 1,
    XK: 1
};

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

function $ad063034c8620db8$export$ea39ec197993aef0(a, b) {
    b = ($d07e34cce18680fd$export$b4a036af3fc0b032)(b, a.calendar);
    return a.era === b.era && a.year === b.year && a.month === b.month && a.day === b.day;
}
function $ad063034c8620db8$export$a18c89cbd24170ff(a, b) {
    b = ($d07e34cce18680fd$export$b4a036af3fc0b032)(b, a.calendar);
    // In the Japanese calendar, months can span multiple eras/years, so only compare the first of the month.
    a = $ad063034c8620db8$export$a5a3b454ada2268e(a);
    b = $ad063034c8620db8$export$a5a3b454ada2268e(b);
    return a.era === b.era && a.year === b.year && a.month === b.month;
}
function $ad063034c8620db8$export$5a8da0c44a3afdf2(a, b) {
    return $ad063034c8620db8$export$dbc69fd56b53d5e(a.calendar, b.calendar) && $ad063034c8620db8$export$a18c89cbd24170ff(a, b);
}
function $ad063034c8620db8$export$dbc69fd56b53d5e(a, b) {
    return a.isEqual?.(b) ?? b.isEqual?.(a) ?? a.identifier === b.identifier;
}
function $ad063034c8620db8$export$629b0a497aa65267(date, timeZone) {
    return $ad063034c8620db8$export$ea39ec197993aef0(date, $ad063034c8620db8$export$d0bdf45af03a6ea3(timeZone));
}
function $ad063034c8620db8$export$2061056d06d7cdf7(date, locale, firstDayOfWeek) {
    let julian = date.calendar.toJulianDay(date);
    // If julian is negative, then julian % 7 will be negative, so we adjust
    // accordingly.  Julian day 0 is Monday.
    let weekStart = $ad063034c8620db8$var$getWeekStart(locale);
    let dayOfWeek = Math.ceil(julian + 1 - weekStart) % 7;
    if (dayOfWeek < 0) dayOfWeek += 7;
    return dayOfWeek;
}
function $ad063034c8620db8$export$461939dd4422153(timeZone) {
    return ($d07e34cce18680fd$export$1b96692a1ba042ac)(Date.now(), timeZone);
}
function $ad063034c8620db8$export$d0bdf45af03a6ea3(timeZone) {
    return ($d07e34cce18680fd$export$93522d1a439f3617)($ad063034c8620db8$export$461939dd4422153(timeZone));
}
function $ad063034c8620db8$export$68781ddf31c0090f(a, b) {
    return a.calendar.toJulianDay(a) - b.calendar.toJulianDay(b);
}
function $ad063034c8620db8$export$c19a80a9721b80f6(a, b) {
    return $ad063034c8620db8$var$timeToMs(a) - $ad063034c8620db8$var$timeToMs(b);
}
function $ad063034c8620db8$var$timeToMs(a) {
    return a.hour * 3600000 + a.minute * 60000 + a.second * 1000 + a.millisecond;
}
let $ad063034c8620db8$var$localTimeZone = null;
let $ad063034c8620db8$var$localTimeZoneOverride = false;
function $ad063034c8620db8$export$aa8b41735afcabd2() {
    if ($ad063034c8620db8$var$localTimeZone == null) $ad063034c8620db8$var$localTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    return $ad063034c8620db8$var$localTimeZone;
}
function $ad063034c8620db8$export$6ab69b273755230b() {
    return $ad063034c8620db8$var$localTimeZoneOverride;
}
function $ad063034c8620db8$export$a5a3b454ada2268e(date) {
    // Use `subtract` instead of `set` so we don't get constrained in an era.
    return date.subtract({
        days: date.day - 1
    });
}
function $ad063034c8620db8$export$a2258d9c4118825c(date) {
    return date.add({
        days: date.calendar.getDaysInMonth(date) - date.day
    });
}
const $ad063034c8620db8$var$cachedRegions = new Map();
const $ad063034c8620db8$var$cachedWeekInfo = new Map();
function $ad063034c8620db8$var$getRegion(locale) {
    // If the Intl.Locale API is available, use it to get the region for the locale.
    // @ts-ignore
    if (Intl.Locale) {
        // Constructing an Intl.Locale is expensive, so cache the result.
        let region = $ad063034c8620db8$var$cachedRegions.get(locale);
        if (!region) {
            // @ts-ignore
            region = new Intl.Locale(locale).maximize().region;
            if (region) $ad063034c8620db8$var$cachedRegions.set(locale, region);
        }
        return region;
    }
    // If not, just try splitting the string.
    // If the second part of the locale string is 'u',
    // then this is a unicode extension, so ignore it.
    // Otherwise, it should be the region.
    let part = locale.split('-')[1];
    return part === 'u' ? undefined : part;
}
function $ad063034c8620db8$var$getWeekStart(locale) {
    // TODO: use Intl.Locale for this once browsers support the weekInfo property
    // https://github.com/tc39/proposal-intl-locale-info
    let weekInfo = $ad063034c8620db8$var$cachedWeekInfo.get(locale);
    if (!weekInfo) {
        if (Intl.Locale) {
            // @ts-ignore
            let localeInst = new Intl.Locale(locale);
            if ('getWeekInfo' in localeInst) {
                // @ts-expect-error
                weekInfo = localeInst.getWeekInfo();
                if (weekInfo) {
                    $ad063034c8620db8$var$cachedWeekInfo.set(locale, weekInfo);
                    return weekInfo.firstDay;
                }
            }
        }
        let region = $ad063034c8620db8$var$getRegion(locale);
        if (locale.includes('-fw-')) {
            // pull the value for the attribute fw from strings such as en-US-u-ca-iso8601-fw-tue or en-US-u-ca-iso8601-fw-mon-nu-thai
            // where the fw attribute could be followed by another unicode locale extension or not
            let day = locale.split('-fw-')[1].split('-')[0];
            if (day === 'mon') weekInfo = {
                firstDay: 1
            };
            else if (day === 'tue') weekInfo = {
                firstDay: 2
            };
            else if (day === 'wed') weekInfo = {
                firstDay: 3
            };
            else if (day === 'thu') weekInfo = {
                firstDay: 4
            };
            else if (day === 'fri') weekInfo = {
                firstDay: 5
            };
            else if (day === 'sat') weekInfo = {
                firstDay: 6
            };
            else weekInfo = {
                firstDay: 0
            };
        } else if (locale.includes('-ca-iso8601')) weekInfo = {
            firstDay: 1
        };
        else weekInfo = {
            firstDay: region ? ($d2ca8165c9aa885a$export$7a5acbd77d414bd9)[region] || 0 : 0
        };
        $ad063034c8620db8$var$cachedWeekInfo.set(locale, weekInfo);
    }
    return weekInfo.firstDay;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from the TC39 Temporal proposal.
// Original licensing can be found in the NOTICE file in the root directory of this source tree.




function $d07e34cce18680fd$export$bd4fb2bc8bb06fb(date) {
    date = $d07e34cce18680fd$export$b4a036af3fc0b032(date, new ($93635573935797de$export$80ee6245ec4f29ec)());
    let year = ($93635573935797de$export$c36e0ecb2d4fa69d)(date.era, date.year);
    return $d07e34cce18680fd$var$epochFromParts(year, date.month, date.day, date.hour, date.minute, date.second, date.millisecond);
}
function $d07e34cce18680fd$var$epochFromParts(year, month, day, hour, minute, second, millisecond) {
    // Note: Date.UTC() interprets one and two-digit years as being in the
    // 20th century, so don't use it
    let date = new Date();
    date.setUTCHours(hour, minute, second, millisecond);
    date.setUTCFullYear(year, month - 1, day);
    return date.getTime();
}
function $d07e34cce18680fd$export$59c99f3515d3493f(ms, timeZone) {
    // Fast path for UTC.
    if (timeZone === 'UTC') return 0;
    // Fast path: for local timezone after 1970, use native Date.
    // Skip this fast path if the local timezone was explicitly overridden via setLocalTimeZone,
    // since native Date always uses the browser's timezone, not the overridden one.
    if (ms > 0 && timeZone === ($ad063034c8620db8$export$aa8b41735afcabd2)() && !($ad063034c8620db8$export$6ab69b273755230b)()) return new Date(ms).getTimezoneOffset() * -6e4;
    let { year: year, month: month, day: day, hour: hour, minute: minute, second: second } = $d07e34cce18680fd$var$getTimeZoneParts(ms, timeZone);
    let utc = $d07e34cce18680fd$var$epochFromParts(year, month, day, hour, minute, second, 0);
    return utc - Math.floor(ms / 1000) * 1000;
}
const $d07e34cce18680fd$var$formattersByTimeZone = new Map();
function $d07e34cce18680fd$var$getTimeZoneParts(ms, timeZone) {
    let formatter = $d07e34cce18680fd$var$formattersByTimeZone.get(timeZone);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            hour12: false,
            era: 'short',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        $d07e34cce18680fd$var$formattersByTimeZone.set(timeZone, formatter);
    }
    let parts = formatter.formatToParts(new Date(ms));
    let namedParts = {};
    for (let part of parts)if (part.type !== 'literal') namedParts[part.type] = part.value;
    return {
        // Firefox returns B instead of BC... https://bugzilla.mozilla.org/show_bug.cgi?id=1752253
        year: namedParts.era === 'BC' || namedParts.era === 'B' ? -namedParts.year + 1 : +namedParts.year,
        month: +namedParts.month,
        day: +namedParts.day,
        hour: namedParts.hour === '24' ? 0 : +namedParts.hour,
        minute: +namedParts.minute,
        second: +namedParts.second
    };
}
const $d07e34cce18680fd$var$DAYMILLIS = 86400000;
function $d07e34cce18680fd$export$136f38efe7caf549(date, timeZone) {
    let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(date);
    let earlier = ms - $d07e34cce18680fd$export$59c99f3515d3493f(ms - $d07e34cce18680fd$var$DAYMILLIS, timeZone);
    let later = ms - $d07e34cce18680fd$export$59c99f3515d3493f(ms + $d07e34cce18680fd$var$DAYMILLIS, timeZone);
    return $d07e34cce18680fd$var$getValidWallTimes(date, timeZone, earlier, later);
}
function $d07e34cce18680fd$var$getValidWallTimes(date, timeZone, earlier, later) {
    let found = earlier === later ? [
        earlier
    ] : [
        earlier,
        later
    ];
    return found.filter((absolute)=>$d07e34cce18680fd$var$isValidWallTime(date, timeZone, absolute));
}
function $d07e34cce18680fd$var$isValidWallTime(date, timeZone, absolute) {
    let parts = $d07e34cce18680fd$var$getTimeZoneParts(absolute, timeZone);
    return date.year === parts.year && date.month === parts.month && date.day === parts.day && date.hour === parts.hour && date.minute === parts.minute && date.second === parts.second;
}
function $d07e34cce18680fd$export$5107c82f94518f5c(date, timeZone, disambiguation = 'compatible') {
    let dateTime = $d07e34cce18680fd$export$b21e0b124e224484(date);
    // Fast path: if the time zone is UTC, use native Date.
    if (timeZone === 'UTC') return $d07e34cce18680fd$export$bd4fb2bc8bb06fb(dateTime);
    // Fast path: if the time zone is the local timezone and disambiguation is compatible, use native Date.
    // Skip this fast path if the local timezone was explicitly overridden via setLocalTimeZone,
    // since native Date always uses the browser's timezone, not the overridden one.
    if (timeZone === ($ad063034c8620db8$export$aa8b41735afcabd2)() && disambiguation === 'compatible' && !($ad063034c8620db8$export$6ab69b273755230b)()) {
        dateTime = $d07e34cce18680fd$export$b4a036af3fc0b032(dateTime, new ($93635573935797de$export$80ee6245ec4f29ec)());
        // Don't use Date constructor here because two-digit years are interpreted in the 20th century.
        let date = new Date();
        let year = ($93635573935797de$export$c36e0ecb2d4fa69d)(dateTime.era, dateTime.year);
        date.setFullYear(year, dateTime.month - 1, dateTime.day);
        date.setHours(dateTime.hour, dateTime.minute, dateTime.second, dateTime.millisecond);
        return date.getTime();
    }
    let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(dateTime);
    let offsetBefore = $d07e34cce18680fd$export$59c99f3515d3493f(ms - $d07e34cce18680fd$var$DAYMILLIS, timeZone);
    let offsetAfter = $d07e34cce18680fd$export$59c99f3515d3493f(ms + $d07e34cce18680fd$var$DAYMILLIS, timeZone);
    let valid = $d07e34cce18680fd$var$getValidWallTimes(dateTime, timeZone, ms - offsetBefore, ms - offsetAfter);
    if (valid.length === 1) return valid[0];
    if (valid.length > 1) switch(disambiguation){
        // 'compatible' means 'earlier' for "fall back" transitions
        case 'compatible':
        case 'earlier':
            return valid[0];
        case 'later':
            return valid[valid.length - 1];
        case 'reject':
            throw new RangeError('Multiple possible absolute times found');
    }
    switch(disambiguation){
        case 'earlier':
            return Math.min(ms - offsetBefore, ms - offsetAfter);
        // 'compatible' means 'later' for "spring forward" transitions
        case 'compatible':
        case 'later':
            return Math.max(ms - offsetBefore, ms - offsetAfter);
        case 'reject':
            throw new RangeError('No such absolute time found');
    }
}
function $d07e34cce18680fd$export$e67a095c620b86fe(dateTime, timeZone, disambiguation = 'compatible') {
    return new Date($d07e34cce18680fd$export$5107c82f94518f5c(dateTime, timeZone, disambiguation));
}
function $d07e34cce18680fd$export$1b96692a1ba042ac(ms, timeZone) {
    let offset = $d07e34cce18680fd$export$59c99f3515d3493f(ms, timeZone);
    let date = new Date(ms + offset);
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getUTCHours();
    let minute = date.getUTCMinutes();
    let second = date.getUTCSeconds();
    let millisecond = date.getUTCMilliseconds();
    return new ($2aaf608024c21ca1$export$d3b7288e7994edea)(year < 1 ? 'BC' : 'AD', year < 1 ? -year + 1 : year, month, day, timeZone, offset, hour, minute, second, millisecond);
}
function $d07e34cce18680fd$export$93522d1a439f3617(dateTime) {
    return new ($2aaf608024c21ca1$export$99faa760c7908e4f)(dateTime.calendar, dateTime.era, dateTime.year, dateTime.month, dateTime.day);
}
function $d07e34cce18680fd$export$b21e0b124e224484(date, time) {
    let hour = 0, minute = 0, second = 0, millisecond = 0;
    if ('timeZone' in date) ({ hour: hour, minute: minute, second: second, millisecond: millisecond } = date);
    else if ('hour' in date && !time) return date;
    if (time) ({ hour: hour, minute: minute, second: second, millisecond: millisecond } = time);
    return new ($2aaf608024c21ca1$export$ca871e8dbb80966f)(date.calendar, date.era, date.year, date.month, date.day, hour, minute, second, millisecond);
}
function $d07e34cce18680fd$export$b4a036af3fc0b032(date, calendar) {
    if (($ad063034c8620db8$export$dbc69fd56b53d5e)(date.calendar, calendar)) return date;
    let calendarDate = calendar.fromJulianDay(date.calendar.toJulianDay(date));
    let copy = date.copy();
    copy.calendar = calendar;
    copy.era = calendarDate.era;
    copy.year = calendarDate.year;
    copy.month = calendarDate.month;
    copy.day = calendarDate.day;
    ($435a2ceaa8778ed8$export$c4e2ecac49351ef2)(copy);
    return copy;
}
function $d07e34cce18680fd$export$84c95a83c799e074(date, timeZone, disambiguation) {
    if (date instanceof ($2aaf608024c21ca1$export$d3b7288e7994edea)) {
        if (date.timeZone === timeZone) return date;
        return $d07e34cce18680fd$export$538b00033cc11c75(date, timeZone);
    }
    let ms = $d07e34cce18680fd$export$5107c82f94518f5c(date, timeZone, disambiguation);
    return $d07e34cce18680fd$export$1b96692a1ba042ac(ms, timeZone);
}
function $d07e34cce18680fd$export$83aac07b4c37b25(date) {
    let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(date) - date.offset;
    return new Date(ms);
}
function $d07e34cce18680fd$export$538b00033cc11c75(date, timeZone) {
    let ms = $d07e34cce18680fd$export$bd4fb2bc8bb06fb(date) - date.offset;
    return $d07e34cce18680fd$export$b4a036af3fc0b032($d07e34cce18680fd$export$1b96692a1ba042ac(ms, timeZone), date.calendar);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 

const $435a2ceaa8778ed8$var$ONE_HOUR = 3600000;
function $435a2ceaa8778ed8$export$e16d8520af44a096(date, duration) {
    let mutableDate = date.copy();
    let days = 'hour' in mutableDate ? $435a2ceaa8778ed8$var$addTimeFields(mutableDate, duration) : 0;
    $435a2ceaa8778ed8$var$addYears(mutableDate, duration.years || 0);
    if (mutableDate.calendar.balanceYearMonth) mutableDate.calendar.balanceYearMonth(mutableDate, date);
    mutableDate.month += duration.months || 0;
    $435a2ceaa8778ed8$var$balanceYearMonth(mutableDate);
    $435a2ceaa8778ed8$var$constrainMonthDay(mutableDate);
    mutableDate.day += (duration.weeks || 0) * 7;
    mutableDate.day += duration.days || 0;
    mutableDate.day += days;
    $435a2ceaa8778ed8$var$balanceDay(mutableDate);
    if (mutableDate.calendar.balanceDate) mutableDate.calendar.balanceDate(mutableDate);
    // Constrain in case adding ended up with a date outside the valid range for the calendar system.
    // The behavior here is slightly different than when constraining in the `set` function in that
    // we adjust smaller fields to their minimum/maximum values rather than constraining each field
    // individually. This matches the general behavior of `add` vs `set` regarding how fields are balanced.
    if (mutableDate.year < 1) {
        mutableDate.year = 1;
        mutableDate.month = 1;
        mutableDate.day = 1;
    }
    let maxYear = mutableDate.calendar.getYearsInEra(mutableDate);
    if (mutableDate.year > maxYear) {
        let isInverseEra = mutableDate.calendar.isInverseEra?.(mutableDate);
        mutableDate.year = maxYear;
        mutableDate.month = isInverseEra ? 1 : mutableDate.calendar.getMonthsInYear(mutableDate);
        mutableDate.day = isInverseEra ? 1 : mutableDate.calendar.getDaysInMonth(mutableDate);
    }
    if (mutableDate.month < 1) {
        mutableDate.month = 1;
        mutableDate.day = 1;
    }
    let maxMonth = mutableDate.calendar.getMonthsInYear(mutableDate);
    if (mutableDate.month > maxMonth) {
        mutableDate.month = maxMonth;
        mutableDate.day = mutableDate.calendar.getDaysInMonth(mutableDate);
    }
    mutableDate.day = Math.max(1, Math.min(mutableDate.calendar.getDaysInMonth(mutableDate), mutableDate.day));
    return mutableDate;
}
function $435a2ceaa8778ed8$var$addYears(date, years) {
    if (date.calendar.isInverseEra?.(date)) years = -years;
    date.year += years;
}
function $435a2ceaa8778ed8$var$balanceYearMonth(date) {
    while(date.month < 1){
        $435a2ceaa8778ed8$var$addYears(date, -1);
        date.month += date.calendar.getMonthsInYear(date);
    }
    let monthsInYear = 0;
    while(date.month > (monthsInYear = date.calendar.getMonthsInYear(date))){
        date.month -= monthsInYear;
        $435a2ceaa8778ed8$var$addYears(date, 1);
    }
}
function $435a2ceaa8778ed8$var$balanceDay(date) {
    while(date.day < 1){
        date.month--;
        $435a2ceaa8778ed8$var$balanceYearMonth(date);
        date.day += date.calendar.getDaysInMonth(date);
    }
    while(date.day > date.calendar.getDaysInMonth(date)){
        date.day -= date.calendar.getDaysInMonth(date);
        date.month++;
        $435a2ceaa8778ed8$var$balanceYearMonth(date);
    }
}
function $435a2ceaa8778ed8$var$constrainMonthDay(date) {
    date.month = Math.max(1, Math.min(date.calendar.getMonthsInYear(date), date.month));
    date.day = Math.max(1, Math.min(date.calendar.getDaysInMonth(date), date.day));
}
function $435a2ceaa8778ed8$export$c4e2ecac49351ef2(date) {
    if (date.calendar.constrainDate) date.calendar.constrainDate(date);
    date.year = Math.max(1, Math.min(date.calendar.getYearsInEra(date), date.year));
    $435a2ceaa8778ed8$var$constrainMonthDay(date);
}
function $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration) {
    let inverseDuration = {};
    for(let key in duration)if (typeof duration[key] === 'number') inverseDuration[key] = -duration[key];
    return inverseDuration;
}
function $435a2ceaa8778ed8$export$4e2d2ead65e5f7e3(date, duration) {
    return $435a2ceaa8778ed8$export$e16d8520af44a096(date, $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration));
}
function $435a2ceaa8778ed8$export$adaa4cf7ef1b65be(date, fields) {
    let mutableDate = date.copy();
    if (fields.era != null) mutableDate.era = fields.era;
    if (fields.year != null) mutableDate.year = fields.year;
    if (fields.month != null) mutableDate.month = fields.month;
    if (fields.day != null) mutableDate.day = fields.day;
    $435a2ceaa8778ed8$export$c4e2ecac49351ef2(mutableDate);
    return mutableDate;
}
function $435a2ceaa8778ed8$export$e5d5e1c1822b6e56(value, fields) {
    let mutableValue = value.copy();
    if (fields.hour != null) mutableValue.hour = fields.hour;
    if (fields.minute != null) mutableValue.minute = fields.minute;
    if (fields.second != null) mutableValue.second = fields.second;
    if (fields.millisecond != null) mutableValue.millisecond = fields.millisecond;
    $435a2ceaa8778ed8$export$7555de1e070510cb(mutableValue);
    return mutableValue;
}
function $435a2ceaa8778ed8$var$balanceTime(time) {
    time.second += Math.floor(time.millisecond / 1000);
    time.millisecond = $435a2ceaa8778ed8$var$nonNegativeMod(time.millisecond, 1000);
    time.minute += Math.floor(time.second / 60);
    time.second = $435a2ceaa8778ed8$var$nonNegativeMod(time.second, 60);
    time.hour += Math.floor(time.minute / 60);
    time.minute = $435a2ceaa8778ed8$var$nonNegativeMod(time.minute, 60);
    let days = Math.floor(time.hour / 24);
    time.hour = $435a2ceaa8778ed8$var$nonNegativeMod(time.hour, 24);
    return days;
}
function $435a2ceaa8778ed8$export$7555de1e070510cb(time) {
    time.millisecond = Math.max(0, Math.min(time.millisecond, 1000));
    time.second = Math.max(0, Math.min(time.second, 59));
    time.minute = Math.max(0, Math.min(time.minute, 59));
    time.hour = Math.max(0, Math.min(time.hour, 23));
}
function $435a2ceaa8778ed8$var$nonNegativeMod(a, b) {
    let result = a % b;
    if (result < 0) result += b;
    return result;
}
function $435a2ceaa8778ed8$var$addTimeFields(time, duration) {
    time.hour += duration.hours || 0;
    time.minute += duration.minutes || 0;
    time.second += duration.seconds || 0;
    time.millisecond += duration.milliseconds || 0;
    return $435a2ceaa8778ed8$var$balanceTime(time);
}
function $435a2ceaa8778ed8$export$d52ced6badfb9a4c(value, field, amount, options) {
    let mutable = value.copy();
    switch(field){
        case 'era':
            {
                let eras = value.calendar.getEras();
                let eraIndex = eras.indexOf(value.era);
                if (eraIndex < 0) throw new Error('Invalid era: ' + value.era);
                eraIndex = $435a2ceaa8778ed8$var$cycleValue(eraIndex, amount, 0, eras.length - 1, options?.round);
                mutable.era = eras[eraIndex];
                // Constrain the year and other fields within the era, so the era doesn't change when we balance below.
                $435a2ceaa8778ed8$export$c4e2ecac49351ef2(mutable);
                break;
            }
        case 'year':
            if (mutable.calendar.isInverseEra?.(mutable)) amount = -amount;
            // The year field should not cycle within the era as that can cause weird behavior affecting other fields.
            // We need to also allow values < 1 so that decrementing goes to the previous era. If we get -Infinity back
            // we know we wrapped around after reaching 9999 (the maximum), so set the year back to 1.
            mutable.year = $435a2ceaa8778ed8$var$cycleValue(value.year, amount, -Infinity, 9999, options?.round);
            if (mutable.year === -Infinity) mutable.year = 1;
            if (mutable.calendar.balanceYearMonth) mutable.calendar.balanceYearMonth(mutable, value);
            break;
        case 'month':
            mutable.month = $435a2ceaa8778ed8$var$cycleValue(value.month, amount, 1, value.calendar.getMonthsInYear(value), options?.round);
            break;
        case 'day':
            mutable.day = $435a2ceaa8778ed8$var$cycleValue(value.day, amount, 1, value.calendar.getDaysInMonth(value), options?.round);
            break;
        default:
            throw new Error('Unsupported field ' + field);
    }
    if (value.calendar.balanceDate) value.calendar.balanceDate(mutable);
    $435a2ceaa8778ed8$export$c4e2ecac49351ef2(mutable);
    return mutable;
}
function $435a2ceaa8778ed8$export$dd02b3e0007dfe28(value, field, amount, options) {
    let mutable = value.copy();
    switch(field){
        case 'hour':
            {
                let hours = value.hour;
                let min = 0;
                let max = 23;
                if (options?.hourCycle === 12) {
                    let isPM = hours >= 12;
                    min = isPM ? 12 : 0;
                    max = isPM ? 23 : 11;
                }
                mutable.hour = $435a2ceaa8778ed8$var$cycleValue(hours, amount, min, max, options?.round);
                break;
            }
        case 'minute':
            mutable.minute = $435a2ceaa8778ed8$var$cycleValue(value.minute, amount, 0, 59, options?.round);
            break;
        case 'second':
            mutable.second = $435a2ceaa8778ed8$var$cycleValue(value.second, amount, 0, 59, options?.round);
            break;
        case 'millisecond':
            mutable.millisecond = $435a2ceaa8778ed8$var$cycleValue(value.millisecond, amount, 0, 999, options?.round);
            break;
        default:
            throw new Error('Unsupported field ' + field);
    }
    return mutable;
}
function $435a2ceaa8778ed8$var$cycleValue(value, amount, min, max, round = false) {
    if (round) {
        value += Math.sign(amount);
        if (value < min) value = max;
        let div = Math.abs(amount);
        if (amount > 0) value = Math.ceil(value / div) * div;
        else value = Math.floor(value / div) * div;
        if (value > max) value = min;
    } else {
        value += amount;
        if (value < min) value = max - (min - value - 1);
        else if (value > max) value = min + (value - max - 1);
    }
    return value;
}
function $435a2ceaa8778ed8$export$96b1d28349274637(dateTime, duration) {
    let ms;
    if (duration.years != null && duration.years !== 0 || duration.months != null && duration.months !== 0 || duration.weeks != null && duration.weeks !== 0 || duration.days != null && duration.days !== 0) {
        let res = $435a2ceaa8778ed8$export$e16d8520af44a096(($d07e34cce18680fd$export$b21e0b124e224484)(dateTime), {
            years: duration.years,
            months: duration.months,
            weeks: duration.weeks,
            days: duration.days
        });
        // Changing the date may change the timezone offset, so we need to recompute
        // using the 'compatible' disambiguation.
        ms = ($d07e34cce18680fd$export$5107c82f94518f5c)(res, dateTime.timeZone);
    } else // Otherwise, preserve the offset of the original date.
    ms = ($d07e34cce18680fd$export$bd4fb2bc8bb06fb)(dateTime) - dateTime.offset;
    // Perform time manipulation in milliseconds rather than on the original time fields to account for DST.
    // For example, adding one hour during a DST transition may result in the hour field staying the same or
    // skipping an hour. This results in the offset field changing value instead of the specified field.
    ms += duration.milliseconds || 0;
    ms += (duration.seconds || 0) * 1000;
    ms += (duration.minutes || 0) * 60000;
    ms += (duration.hours || 0) * 3600000;
    let res = ($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, dateTime.timeZone);
    return ($d07e34cce18680fd$export$b4a036af3fc0b032)(res, dateTime.calendar);
}
function $435a2ceaa8778ed8$export$6814caac34ca03c7(dateTime, duration) {
    return $435a2ceaa8778ed8$export$96b1d28349274637(dateTime, $435a2ceaa8778ed8$export$3e2544e88a25bff8(duration));
}
function $435a2ceaa8778ed8$export$9a297d111fc86b79(dateTime, field, amount, options) {
    // For date fields, we want the time to remain consistent and the UTC offset to potentially change to account for DST changes.
    // For time fields, we want the time to change by the amount given. This may result in the hour field staying the same, but the UTC
    // offset changing in the case of a backward DST transition, or skipping an hour in the case of a forward DST transition.
    switch(field){
        case 'hour':
            {
                let min = 0;
                let max = 23;
                if (options?.hourCycle === 12) {
                    let isPM = dateTime.hour >= 12;
                    min = isPM ? 12 : 0;
                    max = isPM ? 23 : 11;
                }
                // The minimum and maximum hour may be affected by daylight saving time.
                // For example, it might jump forward at midnight, and skip 1am.
                // Or it might end at midnight and repeat the 11pm hour. To handle this, we get
                // the possible absolute times for the min and max, and find the maximum range
                // that is within the current day.
                let plainDateTime = ($d07e34cce18680fd$export$b21e0b124e224484)(dateTime);
                let minDate = ($d07e34cce18680fd$export$b4a036af3fc0b032)($435a2ceaa8778ed8$export$e5d5e1c1822b6e56(plainDateTime, {
                    hour: min
                }), new ($93635573935797de$export$80ee6245ec4f29ec)());
                let minAbsolute = [
                    ($d07e34cce18680fd$export$5107c82f94518f5c)(minDate, dateTime.timeZone, 'earlier'),
                    ($d07e34cce18680fd$export$5107c82f94518f5c)(minDate, dateTime.timeZone, 'later')
                ].filter((ms)=>($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, dateTime.timeZone).day === minDate.day)[0];
                let maxDate = ($d07e34cce18680fd$export$b4a036af3fc0b032)($435a2ceaa8778ed8$export$e5d5e1c1822b6e56(plainDateTime, {
                    hour: max
                }), new ($93635573935797de$export$80ee6245ec4f29ec)());
                let maxAbsolute = [
                    ($d07e34cce18680fd$export$5107c82f94518f5c)(maxDate, dateTime.timeZone, 'earlier'),
                    ($d07e34cce18680fd$export$5107c82f94518f5c)(maxDate, dateTime.timeZone, 'later')
                ].filter((ms)=>($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, dateTime.timeZone).day === maxDate.day).pop();
                // Since hours may repeat, we need to operate on the absolute time in milliseconds.
                // This is done in hours from the Unix epoch so that cycleValue works correctly,
                // and then converted back to milliseconds.
                let ms = ($d07e34cce18680fd$export$bd4fb2bc8bb06fb)(dateTime) - dateTime.offset;
                let hours = Math.floor(ms / $435a2ceaa8778ed8$var$ONE_HOUR);
                let remainder = ms % $435a2ceaa8778ed8$var$ONE_HOUR;
                ms = $435a2ceaa8778ed8$var$cycleValue(hours, amount, Math.floor(minAbsolute / $435a2ceaa8778ed8$var$ONE_HOUR), Math.floor(maxAbsolute / $435a2ceaa8778ed8$var$ONE_HOUR), options?.round) * $435a2ceaa8778ed8$var$ONE_HOUR + remainder;
                // Now compute the new timezone offset, and convert the absolute time back to local time.
                return ($d07e34cce18680fd$export$b4a036af3fc0b032)(($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, dateTime.timeZone), dateTime.calendar);
            }
        case 'minute':
        case 'second':
        case 'millisecond':
            // @ts-ignore
            return $435a2ceaa8778ed8$export$dd02b3e0007dfe28(dateTime, field, amount, options);
        case 'era':
        case 'year':
        case 'month':
        case 'day':
            {
                let res = $435a2ceaa8778ed8$export$d52ced6badfb9a4c(($d07e34cce18680fd$export$b21e0b124e224484)(dateTime), field, amount, options);
                let ms = ($d07e34cce18680fd$export$5107c82f94518f5c)(res, dateTime.timeZone);
                return ($d07e34cce18680fd$export$b4a036af3fc0b032)(($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, dateTime.timeZone), dateTime.calendar);
            }
        default:
            throw new Error('Unsupported field ' + field);
    }
}
function $435a2ceaa8778ed8$export$31b5430eb18be4f8(dateTime, fields, disambiguation) {
    // Set the date/time fields, and recompute the UTC offset to account for DST changes.
    // We also need to validate by converting back to a local time in case hours are skipped during forward DST transitions.
    let plainDateTime = ($d07e34cce18680fd$export$b21e0b124e224484)(dateTime);
    let res = $435a2ceaa8778ed8$export$e5d5e1c1822b6e56($435a2ceaa8778ed8$export$adaa4cf7ef1b65be(plainDateTime, fields), fields);
    // If the resulting plain date time values are equal, return the original time.
    // We don't want to change the offset when setting the time to the same value.
    if (res.compare(plainDateTime) === 0) return dateTime;
    let ms = ($d07e34cce18680fd$export$5107c82f94518f5c)(res, dateTime.timeZone, disambiguation);
    return ($d07e34cce18680fd$export$b4a036af3fc0b032)(($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, dateTime.timeZone), dateTime.calendar);
}

const $58246871e4652552$var$DATE_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})$/;
const $58246871e4652552$var$DATE_TIME_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?$/;
const $58246871e4652552$var$ZONED_DATE_TIME_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:([+-]\d{2})(?::?(\d{2}))?(?::?(\d{2}))?)?\[(.*?)\]$/;
const $58246871e4652552$var$ABSOLUTE_RE = /^([+-]\d{6}|\d{4})-(\d{2})-(\d{2})(?:T(\d{2}))?(?::(\d{2}))?(?::(\d{2}))?(\.\d+)?(?:(?:([+-]\d{2})(?::?(\d{2}))?)|Z)$/;
function $58246871e4652552$export$6b862160d295c8e(value) {
    let m = value.match($58246871e4652552$var$DATE_RE);
    if (!m) {
        if ($58246871e4652552$var$ABSOLUTE_RE.test(value)) throw new Error(`Invalid ISO 8601 date string: ${value}. Use parseAbsolute() instead.`);
        throw new Error('Invalid ISO 8601 date string: ' + value);
    }
    let date = new ($2aaf608024c21ca1$export$99faa760c7908e4f)($58246871e4652552$var$parseNumber(m[1], 0, 9999), $58246871e4652552$var$parseNumber(m[2], 1, 12), 1);
    date.day = $58246871e4652552$var$parseNumber(m[3], 1, date.calendar.getDaysInMonth(date));
    return date;
}
function $58246871e4652552$export$588937bcd60ade55(value) {
    let m = value.match($58246871e4652552$var$DATE_TIME_RE);
    if (!m) {
        if ($58246871e4652552$var$ABSOLUTE_RE.test(value)) throw new Error(`Invalid ISO 8601 date time string: ${value}. Use parseAbsolute() instead.`);
        throw new Error('Invalid ISO 8601 date time string: ' + value);
    }
    let year = $58246871e4652552$var$parseNumber(m[1], -9999, 9999);
    let era = year < 1 ? 'BC' : 'AD';
    let date = new ($2aaf608024c21ca1$export$ca871e8dbb80966f)(era, year < 1 ? -year + 1 : year, $58246871e4652552$var$parseNumber(m[2], 1, 12), 1, m[4] ? $58246871e4652552$var$parseNumber(m[4], 0, 23) : 0, m[5] ? $58246871e4652552$var$parseNumber(m[5], 0, 59) : 0, m[6] ? $58246871e4652552$var$parseNumber(m[6], 0, 59) : 0, m[7] ? $58246871e4652552$var$parseNumber(m[7], 0, Infinity) * 1000 : 0);
    date.day = $58246871e4652552$var$parseNumber(m[3], 0, date.calendar.getDaysInMonth(date));
    return date;
}
function $58246871e4652552$export$fd7893f06e92a6a4(value, disambiguation) {
    let m = value.match($58246871e4652552$var$ZONED_DATE_TIME_RE);
    if (!m) throw new Error('Invalid ISO 8601 date time string: ' + value);
    let year = $58246871e4652552$var$parseNumber(m[1], -9999, 9999);
    let era = year < 1 ? 'BC' : 'AD';
    let date = new ($2aaf608024c21ca1$export$d3b7288e7994edea)(era, year < 1 ? -year + 1 : year, $58246871e4652552$var$parseNumber(m[2], 1, 12), 1, m[11], 0, m[4] ? $58246871e4652552$var$parseNumber(m[4], 0, 23) : 0, m[5] ? $58246871e4652552$var$parseNumber(m[5], 0, 59) : 0, m[6] ? $58246871e4652552$var$parseNumber(m[6], 0, 59) : 0, m[7] ? $58246871e4652552$var$parseNumber(m[7], 0, Infinity) * 1000 : 0);
    date.day = $58246871e4652552$var$parseNumber(m[3], 0, date.calendar.getDaysInMonth(date));
    let plainDateTime = ($d07e34cce18680fd$export$b21e0b124e224484)(date);
    let ms;
    if (m[8]) {
        let hourOffset = $58246871e4652552$var$parseNumber(m[8], -23, 23);
        date.offset = Math.sign(hourOffset) * (Math.abs(hourOffset) * 3600000 + $58246871e4652552$var$parseNumber(m[9] ?? '0', 0, 59) * 60000 + $58246871e4652552$var$parseNumber(m[10] ?? '0', 0, 59) * 1000);
        ms = ($d07e34cce18680fd$export$bd4fb2bc8bb06fb)(date) - date.offset;
        // Validate offset against parsed date.
        let absolutes = ($d07e34cce18680fd$export$136f38efe7caf549)(plainDateTime, date.timeZone);
        if (!absolutes.includes(ms)) throw new Error(`Offset ${$58246871e4652552$var$offsetToString(date.offset)} is invalid for ${$58246871e4652552$export$4223de14708adc63(date)} in ${date.timeZone}`);
    } else // Convert to absolute and back to fix invalid times due to DST.
    ms = ($d07e34cce18680fd$export$5107c82f94518f5c)(($d07e34cce18680fd$export$b21e0b124e224484)(plainDateTime), date.timeZone, disambiguation);
    return ($d07e34cce18680fd$export$1b96692a1ba042ac)(ms, date.timeZone);
}
function $58246871e4652552$var$parseNumber(value, min, max) {
    let val = Number(value);
    if (val < min || val > max) throw new RangeError(`Value out of range: ${min} <= ${val} <= ${max}`);
    return val;
}
function $58246871e4652552$export$f59dee82248f5ad4(time) {
    return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}:${String(time.second).padStart(2, '0')}${time.millisecond ? String(time.millisecond / 1000).slice(1) : ''}`;
}
function $58246871e4652552$export$60dfd74aa96791bd(date) {
    let gregorianDate = ($d07e34cce18680fd$export$b4a036af3fc0b032)(date, new ($93635573935797de$export$80ee6245ec4f29ec)());
    let year;
    if (gregorianDate.era === 'BC') year = gregorianDate.year === 1 ? '0000' : '-' + String(Math.abs(1 - gregorianDate.year)).padStart(6, '00');
    else year = String(gregorianDate.year).padStart(4, '0');
    return `${year}-${String(gregorianDate.month).padStart(2, '0')}-${String(gregorianDate.day).padStart(2, '0')}`;
}
function $58246871e4652552$export$4223de14708adc63(date) {
    // @ts-ignore
    return `${$58246871e4652552$export$60dfd74aa96791bd(date)}T${$58246871e4652552$export$f59dee82248f5ad4(date)}`;
}
function $58246871e4652552$var$offsetToString(offset) {
    let sign = Math.sign(offset) < 0 ? '-' : '+';
    offset = Math.abs(offset);
    let offsetHours = Math.floor(offset / 3600000);
    let offsetMinutes = Math.floor(offset % 3600000 / 60000);
    let offsetSeconds = Math.floor(offset % 3600000 % 60000 / 1000);
    let stringOffset = `${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
    if (offsetSeconds !== 0) stringOffset += `:${String(offsetSeconds).padStart(2, '0')}`;
    return stringOffset;
}
function $58246871e4652552$export$bf79f1ebf4b18792(date) {
    return `${$58246871e4652552$export$4223de14708adc63(date)}${$58246871e4652552$var$offsetToString(date.offset)}[${date.timeZone}]`;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ 




function $2aaf608024c21ca1$var$shiftArgs(args) {
    let calendar = typeof args[0] === 'object' ? args.shift() : new ($93635573935797de$export$80ee6245ec4f29ec)();
    let era;
    if (typeof args[0] === 'string') era = args.shift();
    else {
        let eras = calendar.getEras();
        era = eras[eras.length - 1];
    }
    let year = args.shift();
    let month = args.shift();
    let day = args.shift();
    return [
        calendar,
        era,
        year,
        month,
        day
    ];
}
class $2aaf608024c21ca1$export$99faa760c7908e4f {
    // This prevents TypeScript from allowing other types with the same fields to match.
    // i.e. a ZonedDateTime should not be be passable to a parameter that expects CalendarDate.
    // If that behavior is desired, use the AnyCalendarDate interface instead.
    // @ts-ignore
    #type;
    constructor(...args){
        let [calendar, era, year, month, day] = $2aaf608024c21ca1$var$shiftArgs(args);
        this.calendar = calendar;
        this.era = era;
        this.year = year;
        this.month = month;
        this.day = day;
        ($435a2ceaa8778ed8$export$c4e2ecac49351ef2)(this);
    }
    /** Returns a copy of this date. */ copy() {
        if (this.era) return new $2aaf608024c21ca1$export$99faa760c7908e4f(this.calendar, this.era, this.year, this.month, this.day);
        else return new $2aaf608024c21ca1$export$99faa760c7908e4f(this.calendar, this.year, this.month, this.day);
    }
    /** Returns a new `CalendarDate` with the given duration added to it. */ add(duration) {
        return ($435a2ceaa8778ed8$export$e16d8520af44a096)(this, duration);
    }
    /** Returns a new `CalendarDate` with the given duration subtracted from it. */ subtract(duration) {
        return ($435a2ceaa8778ed8$export$4e2d2ead65e5f7e3)(this, duration);
    }
    /**
   * Returns a new `CalendarDate` with the given fields set to the provided values. Other fields
   * will be constrained accordingly.
   */ set(fields) {
        return ($435a2ceaa8778ed8$export$adaa4cf7ef1b65be)(this, fields);
    }
    /**
   * Returns a new `CalendarDate` with the given field adjusted by a specified amount.
   * When the resulting value reaches the limits of the field, it wraps around.
   */ cycle(field, amount, options) {
        return ($435a2ceaa8778ed8$export$d52ced6badfb9a4c)(this, field, amount, options);
    }
    /**
   * Converts the date to a native JavaScript Date object, with the time set to midnight in the
   * given time zone.
   */ toDate(timeZone) {
        return ($d07e34cce18680fd$export$e67a095c620b86fe)(this, timeZone);
    }
    /** Converts the date to an ISO 8601 formatted string. */ toString() {
        return ($58246871e4652552$export$60dfd74aa96791bd)(this);
    }
    /**
   * Compares this date with another. A negative result indicates that this date is before the given
   * one, and a positive date indicates that it is after.
   */ compare(b) {
        return ($ad063034c8620db8$export$68781ddf31c0090f)(this, b);
    }
}
class $2aaf608024c21ca1$export$ca871e8dbb80966f {
    // This prevents TypeScript from allowing other types with the same fields to match.
    // @ts-ignore
    #type;
    constructor(...args){
        let [calendar, era, year, month, day] = $2aaf608024c21ca1$var$shiftArgs(args);
        this.calendar = calendar;
        this.era = era;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = args.shift() || 0;
        this.minute = args.shift() || 0;
        this.second = args.shift() || 0;
        this.millisecond = args.shift() || 0;
        ($435a2ceaa8778ed8$export$c4e2ecac49351ef2)(this);
    }
    /** Returns a copy of this date. */ copy() {
        if (this.era) return new $2aaf608024c21ca1$export$ca871e8dbb80966f(this.calendar, this.era, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
        else return new $2aaf608024c21ca1$export$ca871e8dbb80966f(this.calendar, this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
    }
    /** Returns a new `CalendarDateTime` with the given duration added to it. */ add(duration) {
        return ($435a2ceaa8778ed8$export$e16d8520af44a096)(this, duration);
    }
    /** Returns a new `CalendarDateTime` with the given duration subtracted from it. */ subtract(duration) {
        return ($435a2ceaa8778ed8$export$4e2d2ead65e5f7e3)(this, duration);
    }
    /**
   * Returns a new `CalendarDateTime` with the given fields set to the provided values. Other fields
   * will be constrained accordingly.
   */ set(fields) {
        return ($435a2ceaa8778ed8$export$adaa4cf7ef1b65be)(($435a2ceaa8778ed8$export$e5d5e1c1822b6e56)(this, fields), fields);
    }
    /**
   * Returns a new `CalendarDateTime` with the given field adjusted by a specified amount.
   * When the resulting value reaches the limits of the field, it wraps around.
   */ cycle(field, amount, options) {
        switch(field){
            case 'era':
            case 'year':
            case 'month':
            case 'day':
                return ($435a2ceaa8778ed8$export$d52ced6badfb9a4c)(this, field, amount, options);
            default:
                return ($435a2ceaa8778ed8$export$dd02b3e0007dfe28)(this, field, amount, options);
        }
    }
    /** Converts the date to a native JavaScript Date object in the given time zone. */ toDate(timeZone, disambiguation) {
        return ($d07e34cce18680fd$export$e67a095c620b86fe)(this, timeZone, disambiguation);
    }
    /** Converts the date to an ISO 8601 formatted string. */ toString() {
        return ($58246871e4652552$export$4223de14708adc63)(this);
    }
    /**
   * Compares this date with another. A negative result indicates that this date is before the given
   * one, and a positive date indicates that it is after.
   */ compare(b) {
        let res = ($ad063034c8620db8$export$68781ddf31c0090f)(this, b);
        if (res === 0) return ($ad063034c8620db8$export$c19a80a9721b80f6)(this, ($d07e34cce18680fd$export$b21e0b124e224484)(b));
        return res;
    }
}
class $2aaf608024c21ca1$export$d3b7288e7994edea {
    // This prevents TypeScript from allowing other types with the same fields to match.
    // @ts-ignore
    #type;
    constructor(...args){
        let [calendar, era, year, month, day] = $2aaf608024c21ca1$var$shiftArgs(args);
        let timeZone = args.shift();
        let offset = args.shift();
        this.calendar = calendar;
        this.era = era;
        this.year = year;
        this.month = month;
        this.day = day;
        this.timeZone = timeZone;
        this.offset = offset;
        this.hour = args.shift() || 0;
        this.minute = args.shift() || 0;
        this.second = args.shift() || 0;
        this.millisecond = args.shift() || 0;
        ($435a2ceaa8778ed8$export$c4e2ecac49351ef2)(this);
    }
    /** Returns a copy of this date. */ copy() {
        if (this.era) return new $2aaf608024c21ca1$export$d3b7288e7994edea(this.calendar, this.era, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
        else return new $2aaf608024c21ca1$export$d3b7288e7994edea(this.calendar, this.year, this.month, this.day, this.timeZone, this.offset, this.hour, this.minute, this.second, this.millisecond);
    }
    /** Returns a new `ZonedDateTime` with the given duration added to it. */ add(duration) {
        return ($435a2ceaa8778ed8$export$96b1d28349274637)(this, duration);
    }
    /** Returns a new `ZonedDateTime` with the given duration subtracted from it. */ subtract(duration) {
        return ($435a2ceaa8778ed8$export$6814caac34ca03c7)(this, duration);
    }
    /**
   * Returns a new `ZonedDateTime` with the given fields set to the provided values. Other fields
   * will be constrained accordingly.
   */ set(fields, disambiguation) {
        return ($435a2ceaa8778ed8$export$31b5430eb18be4f8)(this, fields, disambiguation);
    }
    /**
   * Returns a new `ZonedDateTime` with the given field adjusted by a specified amount.
   * When the resulting value reaches the limits of the field, it wraps around.
   */ cycle(field, amount, options) {
        return ($435a2ceaa8778ed8$export$9a297d111fc86b79)(this, field, amount, options);
    }
    /** Converts the date to a native JavaScript Date object. */ toDate() {
        return ($d07e34cce18680fd$export$83aac07b4c37b25)(this);
    }
    /**
   * Converts the date to an ISO 8601 formatted string, including the UTC offset and time zone
   * identifier.
   */ toString() {
        return ($58246871e4652552$export$bf79f1ebf4b18792)(this);
    }
    /** Converts the date to an ISO 8601 formatted string in UTC. */ toAbsoluteString() {
        return this.toDate().toISOString();
    }
    /**
   * Compares this date with another. A negative result indicates that this date is before the given
   * one, and a positive date indicates that it is after.
   */ compare(b) {
        // TODO: Is this a bad idea??
        return this.toDate().getTime() - ($d07e34cce18680fd$export$84c95a83c799e074)(b, this.timeZone).toDate().getTime();
    }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ let $12a3c853105e5a70$var$formatterCache = new Map();
class $12a3c853105e5a70$export$ad991b66133851cf {
    constructor(locale, options = {}){
        this.formatter = $12a3c853105e5a70$var$getCachedDateFormatter(locale, options);
        this.options = options;
    }
    /**
   * Formats a date as a string according to the locale and format options passed to the
   * constructor.
   */ format(value) {
        return this.formatter.format(value);
    }
    /** Formats a date to an array of parts such as separators, numbers, punctuation, and more. */ formatToParts(value) {
        return this.formatter.formatToParts(value);
    }
    /** Formats a date range as a string. */ formatRange(start, end) {
        // @ts-ignore
        if (typeof this.formatter.formatRange === 'function') // @ts-ignore
        return this.formatter.formatRange(start, end);
        if (end < start) throw new RangeError('End date must be >= start date');
        // Very basic fallback for old browsers.
        return `${this.formatter.format(start)} \u{2013} ${this.formatter.format(end)}`;
    }
    /** Formats a date range as an array of parts. */ formatRangeToParts(start, end) {
        // @ts-ignore
        if (typeof this.formatter.formatRangeToParts === 'function') // @ts-ignore
        return this.formatter.formatRangeToParts(start, end);
        if (end < start) throw new RangeError('End date must be >= start date');
        let startParts = this.formatter.formatToParts(start);
        let endParts = this.formatter.formatToParts(end);
        return [
            ...startParts.map((p)=>({
                    ...p,
                    source: 'startRange'
                })),
            {
                type: 'literal',
                value: " \u2013 ",
                source: 'shared'
            },
            ...endParts.map((p)=>({
                    ...p,
                    source: 'endRange'
                }))
        ];
    }
    /** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
        let resolvedOptions = this.formatter.resolvedOptions();
        if ($12a3c853105e5a70$var$hasBuggyResolvedHourCycle()) {
            if (!this.resolvedHourCycle) this.resolvedHourCycle = $12a3c853105e5a70$var$getResolvedHourCycle(resolvedOptions.locale, this.options);
            resolvedOptions.hourCycle = this.resolvedHourCycle;
            resolvedOptions.hour12 = this.resolvedHourCycle === 'h11' || this.resolvedHourCycle === 'h12';
        }
        // Safari uses a different name for the Ethiopic (Amete Alem) calendar.
        // https://bugs.webkit.org/show_bug.cgi?id=241564
        if (resolvedOptions.calendar === 'ethiopic-amete-alem') resolvedOptions.calendar = 'ethioaa';
        return resolvedOptions;
    }
}
// There are multiple bugs involving the hour12 and hourCycle options in various browser engines.
//   - Chrome [1] (and the ECMA 402 spec [2]) resolve hour12: false in English and other locales to h24 (24:00 - 23:59)
//     rather than h23 (00:00 - 23:59). Same can happen with hour12: true in French, which Chrome resolves to h11 (00:00 - 11:59)
//     rather than h12 (12:00 - 11:59).
//   - WebKit returns an incorrect hourCycle resolved option in the French locale due to incorrect parsing of 'h' literal
//     in the resolved pattern. It also formats incorrectly when specifying the hourCycle option for the same reason. [3]
// [1] https://bugs.chromium.org/p/chromium/issues/detail?id=1045791
// [2] https://github.com/tc39/ecma402/issues/402
// [3] https://bugs.webkit.org/show_bug.cgi?id=229313
// https://github.com/unicode-org/cldr/blob/018b55eff7ceb389c7e3fc44e2f657eae3b10b38/common/supplemental/supplementalData.xml#L4774-L4802
const $12a3c853105e5a70$var$hour12Preferences = {
    true: {
        // Only Japanese uses the h11 style for 12 hour time. All others use h12.
        ja: 'h11'
    },
    false: {
    }
};
function $12a3c853105e5a70$var$getCachedDateFormatter(locale, options = {}) {
    // Work around buggy hour12 behavior in Chrome / ECMA 402 spec by using hourCycle instead.
    // Only apply the workaround if the issue is detected, because the hourCycle option is buggy in Safari.
    if (typeof options.hour12 === 'boolean' && $12a3c853105e5a70$var$hasBuggyHour12Behavior()) {
        options = {
            ...options
        };
        let pref = $12a3c853105e5a70$var$hour12Preferences[String(options.hour12)][locale.split('-')[0]];
        let defaultHourCycle = options.hour12 ? 'h12' : 'h23';
        options.hourCycle = pref ?? defaultHourCycle;
        delete options.hour12;
    }
    let cacheKey = locale + (options ? Object.entries(options).sort((a, b)=>a[0] < b[0] ? -1 : 1).join() : '');
    if ($12a3c853105e5a70$var$formatterCache.has(cacheKey)) return $12a3c853105e5a70$var$formatterCache.get(cacheKey);
    let numberFormatter = new Intl.DateTimeFormat(locale, options);
    $12a3c853105e5a70$var$formatterCache.set(cacheKey, numberFormatter);
    return numberFormatter;
}
let $12a3c853105e5a70$var$_hasBuggyHour12Behavior = null;
function $12a3c853105e5a70$var$hasBuggyHour12Behavior() {
    if ($12a3c853105e5a70$var$_hasBuggyHour12Behavior == null) $12a3c853105e5a70$var$_hasBuggyHour12Behavior = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false
    }).format(new Date(2020, 2, 3, 0)) === '24';
    return $12a3c853105e5a70$var$_hasBuggyHour12Behavior;
}
let $12a3c853105e5a70$var$_hasBuggyResolvedHourCycle = null;
function $12a3c853105e5a70$var$hasBuggyResolvedHourCycle() {
    if ($12a3c853105e5a70$var$_hasBuggyResolvedHourCycle == null) $12a3c853105e5a70$var$_hasBuggyResolvedHourCycle = new Intl.DateTimeFormat('fr', {
        hour: 'numeric',
        hour12: false
    }).resolvedOptions().hourCycle === 'h12';
    return $12a3c853105e5a70$var$_hasBuggyResolvedHourCycle;
}
function $12a3c853105e5a70$var$getResolvedHourCycle(locale, options) {
    if (!options.timeStyle && !options.hour) return undefined;
    // Work around buggy results in resolved hourCycle and hour12 options in WebKit.
    // Format the minimum possible hour and maximum possible hour in a day and parse the results.
    locale = locale.replace(/(-u-)?-nu-[a-zA-Z0-9]+/, '');
    locale += (locale.includes('-u-') ? '' : '-u') + '-nu-latn';
    let formatter = $12a3c853105e5a70$var$getCachedDateFormatter(locale, {
        ...options,
        timeZone: undefined // use local timezone
    });
    let min = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 0)).find((p)=>p.type === 'hour').value, 10);
    let max = parseInt(formatter.formatToParts(new Date(2020, 2, 3, 23)).find((p)=>p.type === 'hour').value, 10);
    if (min === 0 && max === 23) return 'h23';
    if (min === 24 && max === 23) return 'h24';
    if (min === 0 && max === 11) return 'h11';
    if (min === 12 && max === 11) return 'h12';
    throw new Error('Unexpected hour cycle result');
}

//#region node_modules/@lucide/svelte/dist/icons/badge.svelte
function Badge($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "badge" },
		props,
		{ iconNode: [["path", { "d": "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/brush-cleaning.svelte
function Brush_cleaning($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "brush-cleaning" },
		props,
		{ iconNode: [
			["path", { "d": "m16 22-1-4" }],
			["path", { "d": "M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1" }],
			["path", { "d": "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z" }],
			["path", { "d": "m8 22 1-4" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/calendar.svelte
function Calendar$1($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "calendar" },
		props,
		{ iconNode: [
			["path", { "d": "M8 2v4" }],
			["path", { "d": "M16 2v4" }],
			["rect", {
				"width": "18",
				"height": "18",
				"x": "3",
				"y": "4",
				"rx": "2"
			}],
			["path", { "d": "M3 10h18" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/cloud-upload.svelte
function Cloud_upload($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "cloud-upload" },
		props,
		{ iconNode: [
			["path", { "d": "M12 13v8" }],
			["path", { "d": "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }],
			["path", { "d": "m8 17 4-4 4 4" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/file-text.svelte
function File_text($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "file-text" },
		props,
		{ iconNode: [
			["path", { "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }],
			["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
			["path", { "d": "M10 9H8" }],
			["path", { "d": "M16 13H8" }],
			["path", { "d": "M16 17H8" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/image.svelte
function Image($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "image" },
		props,
		{ iconNode: [
			["rect", {
				"width": "18",
				"height": "18",
				"x": "3",
				"y": "3",
				"rx": "2",
				"ry": "2"
			}],
			["circle", {
				"cx": "9",
				"cy": "9",
				"r": "2"
			}],
			["path", { "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" }]
		] }
	]));
}
/**
* Creates an announcer object that can be used to make `aria-live` announcements to screen readers.
*/
function getAnnouncer(doc) {
	/**
	* Announces a message to screen readers using the specified kind of announcement.
	*/
	function announce(value, kind = "assertive", timeout = 7500) {
		return;
	}
	return { announce };
}
//#endregion
//#region node_modules/bits-ui/dist/internal/date-time/utils.js
var defaultDateDefaults = {
	defaultValue: void 0,
	granularity: "day"
};
/**
* A helper function used throughout the various date builders
* to generate a default `DateValue` using the `defaultValue`,
* `defaultPlaceholder`, `minValue`, `maxValue`, and `granularity` props.
*
* It's important to match the `DateValue` type being used
* elsewhere in the builder, so they behave according to the
* behavior the user expects based on the props they've provided.
*
*/
function getDefaultDate(opts) {
	const { defaultValue, granularity, minValue, maxValue } = {
		...defaultDateDefaults,
		...opts
	};
	if (Array.isArray(defaultValue) && defaultValue.length) return defaultValue[defaultValue.length - 1];
	if (defaultValue && !Array.isArray(defaultValue)) return defaultValue;
	else {
		let date = /* @__PURE__ */ new Date();
		if (minValue && date < minValue.toDate($ad063034c8620db8$export$aa8b41735afcabd2())) date = minValue.toDate($ad063034c8620db8$export$aa8b41735afcabd2());
		else if (maxValue && date > maxValue.toDate($ad063034c8620db8$export$aa8b41735afcabd2())) date = maxValue.toDate($ad063034c8620db8$export$aa8b41735afcabd2());
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		if ([
			"hour",
			"minute",
			"second"
		].includes(granularity ?? "day")) return new $2aaf608024c21ca1$export$ca871e8dbb80966f(year, month, day, 0, 0, 0);
		return new $2aaf608024c21ca1$export$99faa760c7908e4f(year, month, day);
	}
}
/**
* Given a date string and a reference `DateValue` object, parse the
* string to the same type as the reference object.
*
* Useful for parsing strings from data attributes, which are always
* strings, to the same type being used by the date component.
*/
function parseStringToDateValue(dateStr, referenceVal) {
	let dateValue;
	if (referenceVal instanceof $2aaf608024c21ca1$export$d3b7288e7994edea) dateValue = $58246871e4652552$export$fd7893f06e92a6a4(dateStr);
	else if (referenceVal instanceof $2aaf608024c21ca1$export$ca871e8dbb80966f) dateValue = $58246871e4652552$export$588937bcd60ade55(dateStr);
	else dateValue = $58246871e4652552$export$6b862160d295c8e(dateStr);
	return dateValue.calendar !== referenceVal.calendar ? $d07e34cce18680fd$export$b4a036af3fc0b032(dateValue, referenceVal.calendar) : dateValue;
}
/**
* Given a `DateValue` object, convert it to a native `Date` object.
* If a timezone is provided, the date will be converted to that timezone.
* If no timezone is provided, the date will be converted to the local timezone.
*/
function toDate(dateValue, tz = $ad063034c8620db8$export$aa8b41735afcabd2()) {
	if (dateValue instanceof $2aaf608024c21ca1$export$d3b7288e7994edea) return dateValue.toDate();
	else return dateValue.toDate(tz);
}
function getDateValueType(date) {
	if (date instanceof $2aaf608024c21ca1$export$99faa760c7908e4f) return "date";
	if (date instanceof $2aaf608024c21ca1$export$ca871e8dbb80966f) return "datetime";
	if (date instanceof $2aaf608024c21ca1$export$d3b7288e7994edea) return "zoneddatetime";
	throw new Error("Unknown date type");
}
function parseAnyDateValue(value, type) {
	switch (type) {
		case "date": return $58246871e4652552$export$6b862160d295c8e(value);
		case "datetime": return $58246871e4652552$export$588937bcd60ade55(value);
		case "zoneddatetime": return $58246871e4652552$export$fd7893f06e92a6a4(value);
		default: throw new Error(`Unknown date type: ${type}`);
	}
}
function isCalendarDateTime(dateValue) {
	return dateValue instanceof $2aaf608024c21ca1$export$ca871e8dbb80966f;
}
function isZonedDateTime(dateValue) {
	return dateValue instanceof $2aaf608024c21ca1$export$d3b7288e7994edea;
}
function hasTime(dateValue) {
	return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
/**
* Given a date, return the number of days in the month.
*/
function getDaysInMonth(date) {
	if (date instanceof Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		/**
		* By using zero as the day, we get the
		* last day of the previous month, which
		* is the month we originally passed in.
		*/
		return new Date(year, month, 0).getDate();
	} else return date.set({ day: 100 }).day;
}
/**
* Determine if a date is before the reference date.
* @param dateToCompare - is this date before the `referenceDate`
* @param referenceDate - is the `dateToCompare` before this date
*
* @see {@link isBeforeOrSame} for inclusive
*/
function isBefore(dateToCompare, referenceDate) {
	return dateToCompare.compare(referenceDate) < 0;
}
/**
* Determine if a date is after the reference date.
* @param dateToCompare - is this date after the `referenceDate`
* @param referenceDate - is the `dateToCompare` after this date
*
* @see {@link isAfterOrSame} for inclusive
*/
function isAfter(dateToCompare, referenceDate) {
	return dateToCompare.compare(referenceDate) > 0;
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
	const day = $ad063034c8620db8$export$2061056d06d7cdf7(date, locale);
	if (firstDayOfWeek > day) return date.subtract({ days: day + 7 - firstDayOfWeek });
	if (firstDayOfWeek === day) return date;
	return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
	const day = $ad063034c8620db8$export$2061056d06d7cdf7(date, locale);
	const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
	if (day === lastDayOfWeek) return date;
	if (day > lastDayOfWeek) return date.add({ days: 7 - day + lastDayOfWeek });
	return date.add({ days: lastDayOfWeek - day });
}
//#endregion
//#region node_modules/bits-ui/dist/internal/date-time/formatter.js
var defaultPartOptions = {
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	second: "numeric"
};
/**
* Creates a wrapper around the `DateFormatter`, which is
* an improved version of the {@link Intl.DateTimeFormat} API,
* that is used internally by the various date builders to
* easily format dates in a consistent way.
*
* @see [DateFormatter](https://react-spectrum.adobe.com/internationalized/date/DateFormatter.html)
*/
function createFormatter(opts) {
	let locale = opts.initialLocale;
	function setLocale(newLocale) {
		locale = newLocale;
	}
	function getLocale() {
		return locale;
	}
	function custom(date, options) {
		return new $12a3c853105e5a70$export$ad991b66133851cf(locale, options).format(date);
	}
	function selectedDate(date, includeTime = true) {
		if (hasTime(date) && includeTime) return custom(toDate(date), {
			dateStyle: "long",
			timeStyle: "long"
		});
		else return custom(toDate(date), { dateStyle: "long" });
	}
	function fullMonthAndYear(date) {
		if (typeof opts.monthFormat.current !== "function" && typeof opts.yearFormat.current !== "function") return new $12a3c853105e5a70$export$ad991b66133851cf(locale, {
			month: opts.monthFormat.current,
			year: opts.yearFormat.current
		}).format(date);
		return `${typeof opts.monthFormat.current === "function" ? opts.monthFormat.current(date.getMonth() + 1) : new $12a3c853105e5a70$export$ad991b66133851cf(locale, { month: opts.monthFormat.current }).format(date)} ${typeof opts.yearFormat.current === "function" ? opts.yearFormat.current(date.getFullYear()) : new $12a3c853105e5a70$export$ad991b66133851cf(locale, { year: opts.yearFormat.current }).format(date)}`;
	}
	function fullMonth(date) {
		return new $12a3c853105e5a70$export$ad991b66133851cf(locale, { month: "long" }).format(date);
	}
	function fullYear(date) {
		return new $12a3c853105e5a70$export$ad991b66133851cf(locale, { year: "numeric" }).format(date);
	}
	function toParts(date, options) {
		if (isZonedDateTime(date)) return new $12a3c853105e5a70$export$ad991b66133851cf(locale, {
			...options,
			timeZone: date.timeZone
		}).formatToParts(toDate(date));
		else return new $12a3c853105e5a70$export$ad991b66133851cf(locale, options).formatToParts(toDate(date));
	}
	function dayOfWeek(date, length = "narrow") {
		return new $12a3c853105e5a70$export$ad991b66133851cf(locale, { weekday: length }).format(date);
	}
	function dayPeriod(date, hourCycle = void 0) {
		if (new $12a3c853105e5a70$export$ad991b66133851cf(locale, {
			hour: "numeric",
			minute: "numeric",
			hourCycle: hourCycle === 24 ? "h23" : void 0
		}).formatToParts(date).find((p) => p.type === "dayPeriod")?.value === "PM") return "PM";
		return "AM";
	}
	function part(dateObj, type, options = {}) {
		const part = toParts(dateObj, {
			...defaultPartOptions,
			...options
		}).find((p) => p.type === type);
		return part ? part.value : "";
	}
	return {
		setLocale,
		getLocale,
		fullMonth,
		fullYear,
		fullMonthAndYear,
		toParts,
		custom,
		part,
		dayPeriod,
		selectedDate,
		dayOfWeek
	};
}
//#endregion
//#region node_modules/bits-ui/dist/internal/date-time/calendar-helpers.svelte.js
function isCalendarDayNode(node) {
	if (!isHTMLElement(node)) return false;
	if (!node.hasAttribute("data-bits-day")) return false;
	return true;
}
/**
* Retrieves an array of date values representing the days between
* the provided start and end dates.
*/
function getDaysBetween(start, end) {
	const days = [];
	let dCurrent = start.add({ days: 1 });
	const dEnd = end;
	while (dCurrent.compare(dEnd) < 0) {
		days.push(dCurrent);
		dCurrent = dCurrent.add({ days: 1 });
	}
	return days;
}
/**
* Creates a calendar month object.
*
* @remarks
* Given a date, this function returns an object containing
* the necessary values to render a calendar month, including
* the month's date (the first day of that month), which can be
* used to render the name of the month, an array of all dates
* in that month, and an array of weeks. Each week is an array
* of dates, useful for rendering an accessible calendar grid
* using a loop and table elements.
*
*/
function createMonth(props) {
	const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
	const daysInMonth = getDaysInMonth(dateObj);
	const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
	const firstDayOfMonth = $ad063034c8620db8$export$a5a3b454ada2268e(dateObj);
	const lastDayOfMonth = $ad063034c8620db8$export$a2258d9c4118825c(dateObj);
	const lastSunday = weekStartsOn !== void 0 ? getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, "en-US") : getLastFirstDayOfWeek(firstDayOfMonth, 0, locale);
	const nextSaturday = weekStartsOn !== void 0 ? getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, "en-US") : getNextLastDayOfWeek(lastDayOfMonth, 0, locale);
	const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
	const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
	const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
	if (fixedWeeks && totalDays < 42) {
		const extraDays = 42 - totalDays;
		let startFrom = nextMonthDays[nextMonthDays.length - 1];
		if (!startFrom) startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
		let length = extraDays;
		if (nextMonthDays.length === 0) {
			length = extraDays - 1;
			nextMonthDays.push(startFrom);
		}
		const extraDaysArray = Array.from({ length }, (_, i) => {
			const incr = i + 1;
			return startFrom.add({ days: incr });
		});
		nextMonthDays.push(...extraDaysArray);
	}
	const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
	return {
		value: dateObj,
		dates: allDays,
		weeks: chunk(allDays, 7)
	};
}
function createMonths(props) {
	const { numberOfMonths, dateObj, ...monthProps } = props;
	const months = [];
	if (!numberOfMonths || numberOfMonths === 1) {
		months.push(createMonth({
			...monthProps,
			dateObj
		}));
		return months;
	}
	months.push(createMonth({
		...monthProps,
		dateObj
	}));
	for (let i = 1; i < numberOfMonths; i++) {
		const nextMonth = dateObj.add({ months: i });
		months.push(createMonth({
			...monthProps,
			dateObj: nextMonth
		}));
	}
	return months;
}
function getSelectableCells(calendarNode) {
	if (!calendarNode) return [];
	return Array.from(calendarNode.querySelectorAll(`[data-bits-day]:not([data-disabled]):not([data-outside-visible-months])`)).filter((el) => isHTMLElement(el));
}
/**
* A helper function to extract the date from the `data-value`
* attribute of a date cell and set it as the placeholder value.
*
* Shared between the calendar and range calendar builders.
*
* @param node - The node to extract the date from.
* @param placeholder - The placeholder value store which will be set to the extracted date.
*/
function setPlaceholderToNodeValue(node, placeholder) {
	const cellValue = node.getAttribute("data-value");
	if (!cellValue) return;
	placeholder.current = parseStringToDateValue(cellValue, placeholder.current);
}
/**
* Shared logic for shifting focus between cells in the
* calendar and range calendar.
*/
function shiftCalendarFocus({ node, add, placeholder, calendarNode, isPrevButtonDisabled, isNextButtonDisabled, months, numberOfMonths }) {
	const candidateCells = getSelectableCells(calendarNode);
	if (!candidateCells.length) return;
	const nextIndex = candidateCells.indexOf(node) + add;
	/**
	* If the next cell is within the bounds of the displayed cells,
	* easy day, we just focus it.
	*/
	if (isValidIndex(nextIndex, candidateCells)) {
		const nextCell = candidateCells[nextIndex];
		setPlaceholderToNodeValue(nextCell, placeholder);
		return nextCell.focus();
	}
	/**
	* When the next cell falls outside the displayed cells range,
	* we update the focus to the previous or next month based on the
	* direction, and then focus on the relevant cell.
	*/
	if (nextIndex < 0) {
		/**
		* To handle negative indices, we rewind by one month,
		* retrieve candidate cells for that month, and shift focus
		* by the difference between the nextIndex starting from the end
		* of the array.
		*/
		if (isPrevButtonDisabled) return;
		const firstMonth = months[0]?.value;
		if (!firstMonth) return;
		placeholder.current = firstMonth.subtract({ months: numberOfMonths });
		afterTick(() => {
			const newCandidateCells = getSelectableCells(calendarNode);
			if (!newCandidateCells.length) return;
			/**
			* Starting at the end of the array, shift focus by the diff
			* between the nextIndex and the length of the array, since the
			* nextIndex is negative.
			*/
			const newIndex = newCandidateCells.length - Math.abs(nextIndex);
			if (isValidIndex(newIndex, newCandidateCells)) {
				const newCell = newCandidateCells[newIndex];
				setPlaceholderToNodeValue(newCell, placeholder);
				return newCell.focus();
			}
		});
	}
	if (nextIndex >= candidateCells.length) {
		/**
		* Since we're in the positive index range, we need to go forward
		* a month, refetch the candidate cells within that month, and then
		* starting at the beginning of the array, shift focus by the nextIndex
		* amount.
		*/
		if (isNextButtonDisabled) return;
		const firstMonth = months[0]?.value;
		if (!firstMonth) return;
		placeholder.current = firstMonth.add({ months: numberOfMonths });
		afterTick(() => {
			const newCandidateCells = getSelectableCells(calendarNode);
			if (!newCandidateCells.length) return;
			/**
			* We need to determine how far into the next month we need to go
			* to get the next index. So if we only went over the previous month
			* by one, we need to go into the next month by 1 to get the right index.
			*/
			const newIndex = nextIndex - candidateCells.length;
			if (isValidIndex(newIndex, newCandidateCells)) return newCandidateCells[newIndex].focus();
		});
	}
}
var ARROW_KEYS = [
	ARROW_DOWN,
	ARROW_UP,
	ARROW_LEFT,
	ARROW_RIGHT
];
var SELECT_KEYS = [ENTER, " "];
/**
* Shared keyboard event handler for the calendar and range calendar.
*/
function handleCalendarKeydown({ event, handleCellClick, shiftFocus, placeholderValue }) {
	const currentCell = event.target;
	if (!isCalendarDayNode(currentCell)) return;
	if (!ARROW_KEYS.includes(event.key) && !SELECT_KEYS.includes(event.key)) return;
	event.preventDefault();
	const kbdFocusMap = {
		[ARROW_DOWN]: 7,
		[ARROW_UP]: -7,
		[ARROW_LEFT]: -1,
		[ARROW_RIGHT]: 1
	};
	if (ARROW_KEYS.includes(event.key)) {
		const add = kbdFocusMap[event.key];
		if (add !== void 0) shiftFocus(currentCell, add);
	}
	if (SELECT_KEYS.includes(event.key)) {
		const cellValue = currentCell.getAttribute("data-value");
		if (!cellValue) return;
		handleCellClick(event, parseStringToDateValue(cellValue, placeholderValue));
	}
}
function handleCalendarNextPage({ months, setMonths, numberOfMonths, pagedNavigation, weekStartsOn, locale, fixedWeeks, setPlaceholder }) {
	const firstMonth = months[0]?.value;
	if (!firstMonth) return;
	if (pagedNavigation) setPlaceholder(firstMonth.add({ months: numberOfMonths }));
	else {
		const targetDate = firstMonth.add({ months: 1 });
		const newMonths = createMonths({
			dateObj: targetDate,
			weekStartsOn,
			locale,
			fixedWeeks,
			numberOfMonths
		});
		setPlaceholder(targetDate);
		setMonths(newMonths);
	}
}
function handleCalendarPrevPage({ months, setMonths, numberOfMonths, pagedNavigation, weekStartsOn, locale, fixedWeeks, setPlaceholder }) {
	const firstMonth = months[0]?.value;
	if (!firstMonth) return;
	if (pagedNavigation) setPlaceholder(firstMonth.subtract({ months: numberOfMonths }));
	else {
		const targetDate = firstMonth.subtract({ months: 1 });
		const newMonths = createMonths({
			dateObj: targetDate,
			weekStartsOn,
			locale,
			fixedWeeks,
			numberOfMonths
		});
		setPlaceholder(targetDate);
		setMonths(newMonths);
	}
}
function getWeekdays({ months, formatter, weekdayFormat }) {
	if (!months.length) return [];
	const firstWeek = months[0].weeks[0];
	if (!firstWeek) return [];
	return firstWeek.map((date) => formatter.dayOfWeek(toDate(date), weekdayFormat));
}
function useMonthViewPlaceholderSync({ placeholder, getVisibleMonths, weekStartsOn, locale, fixedWeeks, numberOfMonths, setMonths }) {
	/**
	* If the placeholder's month is already in this visible months,
	* we don't need to do anything.
	*/
}
function getIsNextButtonDisabled({ maxValue, months, disabled }) {
	if (!maxValue || !months.length) return false;
	if (disabled) return true;
	const lastMonthInView = months[months.length - 1]?.value;
	if (!lastMonthInView) return false;
	return isAfter(lastMonthInView.add({ months: 1 }).set({ day: 1 }), maxValue);
}
function getIsPrevButtonDisabled({ minValue, months, disabled }) {
	if (!minValue || !months.length) return false;
	if (disabled) return true;
	const firstMonthInView = months[0]?.value;
	if (!firstMonthInView) return false;
	return isBefore(firstMonthInView.subtract({ months: 1 }).set({ day: 35 }), minValue);
}
function getCalendarHeadingValue({ months, locale, formatter }) {
	if (!months.length) return "";
	if (locale !== formatter.getLocale()) formatter.setLocale(locale);
	if (months.length === 1) {
		const month = toDate(months[0].value);
		return `${formatter.fullMonthAndYear(month)}`;
	}
	const startMonth = toDate(months[0].value);
	const endMonth = toDate(months[months.length - 1].value);
	const startMonthName = formatter.fullMonth(startMonth);
	const endMonthName = formatter.fullMonth(endMonth);
	const startMonthYear = formatter.fullYear(startMonth);
	const endMonthYear = formatter.fullYear(endMonth);
	return startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
}
function getCalendarElementProps({ fullCalendarLabel, id, isInvalid, disabled, readonly }) {
	return {
		id,
		role: "application",
		"aria-label": fullCalendarLabel,
		"data-invalid": boolToEmptyStrOrUndef(isInvalid),
		"data-disabled": boolToEmptyStrOrUndef(disabled),
		"data-readonly": boolToEmptyStrOrUndef(readonly)
	};
}
function getFirstNonDisabledDateInView(calendarRef) {
	if (!isBrowser) return;
	const daysInView = Array.from(calendarRef.querySelectorAll("[data-bits-day]:not([aria-disabled=true])"));
	if (daysInView.length === 0) return;
	const element = daysInView[0];
	const value = element?.getAttribute("data-value");
	const type = element?.getAttribute("data-type");
	if (!value || !type) return;
	return parseAnyDateValue(value, type);
}
/**
* Ensures the placeholder is not set to a disabled date,
* which would prevent the user from entering the Calendar
* via the keyboard.
*/
function useEnsureNonDisabledPlaceholder({ ref, placeholder, defaultPlaceholder, minValue, maxValue, isDateDisabled }) {
	function isDisabled(date) {
		if (isDateDisabled.current(date)) return true;
		if (minValue.current && isBefore(date, minValue.current)) return true;
		if (maxValue.current && isBefore(maxValue.current, date)) return true;
		return false;
	}
	watch(() => ref.current, () => {
		if (!ref.current) return;
		/**
		* If the placeholder is still the default placeholder and it's a disabled date, find
		* the first available date in the calendar view and set it as the placeholder.
		*
		* This prevents the placeholder from being a disabled date and no date being tabbable
		* preventing the user from entering the Calendar. If all dates in the view are
		* disabled, currently that is considered an error on the developer's part and should
		* be handled by them.
		*
		* Perhaps in the future we can introduce a dev-only log message to prevent this from
		* being a silent error.
		*/
		if (placeholder.current && $ad063034c8620db8$export$ea39ec197993aef0(placeholder.current, defaultPlaceholder) && isDisabled(defaultPlaceholder)) placeholder.current = getFirstNonDisabledDateInView(ref.current) ?? defaultPlaceholder;
	});
}
function getDateWithPreviousTime(date, prev) {
	if (!date || !prev) return date;
	if (hasTime(date) && hasTime(prev)) return date.set({
		hour: prev.hour,
		minute: prev.minute,
		millisecond: prev.millisecond,
		second: prev.second
	});
	return date;
}
var calendarAttrs = createBitsAttrs({
	component: "calendar",
	parts: [
		"root",
		"grid",
		"cell",
		"next-button",
		"prev-button",
		"day",
		"grid-body",
		"grid-head",
		"grid-row",
		"head-cell",
		"header",
		"heading",
		"month-select",
		"year-select"
	]
});
function getDefaultYears(opts) {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const latestYear = Math.max(opts.placeholderYear, currentYear);
	let minYear;
	let maxYear;
	if (opts.minValue) minYear = opts.minValue.year;
	else {
		const initialMinYear = latestYear - 100;
		minYear = opts.placeholderYear < initialMinYear ? opts.placeholderYear - 10 : initialMinYear;
	}
	if (opts.maxValue) maxYear = opts.maxValue.year;
	else maxYear = latestYear + 10;
	if (minYear > maxYear) minYear = maxYear;
	const totalYears = maxYear - minYear + 1;
	return Array.from({ length: totalYears }, (_, i) => minYear + i);
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/calendar.svelte.js
var CalendarRootContext = new Context("Calendar.Root | RangeCalender.Root");
var CalendarRootState = class CalendarRootState {
	static create(opts) {
		return CalendarRootContext.set(new CalendarRootState(opts));
	}
	opts;
	#visibleMonths = derived(() => this.months.map((month) => month.value));
	get visibleMonths() {
		return this.#visibleMonths();
	}
	set visibleMonths($$value) {
		return this.#visibleMonths($$value);
	}
	formatter;
	accessibleHeadingId = useId();
	domContext;
	attachment;
	months = [];
	announcer;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		this.domContext = new DOMContext(opts.ref);
		this.announcer = getAnnouncer();
		this.formatter = createFormatter({
			initialLocale: this.opts.locale.current,
			monthFormat: this.opts.monthFormat,
			yearFormat: this.opts.yearFormat
		});
		this.setMonths = this.setMonths.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
		this.prevYear = this.prevYear.bind(this);
		this.nextYear = this.nextYear.bind(this);
		this.setYear = this.setYear.bind(this);
		this.setMonth = this.setMonth.bind(this);
		this.isOutsideVisibleMonths = this.isOutsideVisibleMonths.bind(this);
		this.isDateDisabled = this.isDateDisabled.bind(this);
		this.isDateSelected = this.isDateSelected.bind(this);
		this.shiftFocus = this.shiftFocus.bind(this);
		this.handleCellClick = this.handleCellClick.bind(this);
		this.handleMultipleUpdate = this.handleMultipleUpdate.bind(this);
		this.handleSingleUpdate = this.handleSingleUpdate.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
		this.getBitsAttr = this.getBitsAttr.bind(this);
		this.months = createMonths({
			dateObj: this.opts.placeholder.current,
			weekStartsOn: this.opts.weekStartsOn.current,
			locale: this.opts.locale.current,
			fixedWeeks: this.opts.fixedWeeks.current,
			numberOfMonths: this.opts.numberOfMonths.current
		});
		this.#setupInitialFocusEffect();
		this.#setupAccessibleHeadingEffect();
		this.#setupFormatterEffect();
		/**
		* Updates the displayed months based on changes in the placeholder value.
		*/
		useMonthViewPlaceholderSync({
			placeholder: this.opts.placeholder,
			getVisibleMonths: () => this.visibleMonths,
			weekStartsOn: this.opts.weekStartsOn,
			locale: this.opts.locale,
			fixedWeeks: this.opts.fixedWeeks,
			numberOfMonths: this.opts.numberOfMonths,
			setMonths: (months) => this.months = months
		});
		/**
		* Updates the displayed months based on changes in the options values,
		* which determines the month to show in the calendar.
		*/
		this.opts.fixedWeeks, this.opts.locale, this.opts.numberOfMonths, this.opts.placeholder, this.setMonths, this.opts.weekStartsOn;
		/**
		* Update the accessible heading's text content when the `fullCalendarLabel`
		* changes.
		*/
		watch(() => this.fullCalendarLabel, (label) => {
			const node = this.domContext.getElementById(this.accessibleHeadingId);
			if (!node) return;
			node.textContent = label;
		});
		/**
		* Synchronize the placeholder value with the current value.
		*/
		watch(() => this.opts.value.current, () => {
			const value = this.opts.value.current;
			if (Array.isArray(value) && value.length) {
				const lastValue = value[value.length - 1];
				if (lastValue && this.opts.placeholder.current !== lastValue) this.opts.placeholder.current = lastValue;
			} else if (!Array.isArray(value) && value && this.opts.placeholder.current !== value) this.opts.placeholder.current = value;
		});
		useEnsureNonDisabledPlaceholder({
			placeholder: opts.placeholder,
			defaultPlaceholder: opts.defaultPlaceholder,
			isDateDisabled: opts.isDateDisabled,
			maxValue: opts.maxValue,
			minValue: opts.minValue,
			ref: opts.ref
		});
	}
	setMonths(months) {
		this.months = months;
	}
	#weekdays = derived(
		/**
		* This derived state holds an array of localized day names for the current
		* locale and calendar view. It dynamically syncs with the 'weekStartsOn' option,
		* updating its content when the option changes. Using this state to render the
		* calendar's days of the week is strongly recommended, as it guarantees that
		* the days are correctly formatted for the current locale and calendar view.
		*/
		() => {
			return getWeekdays({
				months: this.months,
				formatter: this.formatter,
				weekdayFormat: this.opts.weekdayFormat.current
			});
		}
	);
	get weekdays() {
		return this.#weekdays();
	}
	set weekdays($$value) {
		return this.#weekdays($$value);
	}
	#initialPlaceholderYear = derived(() => run(() => this.opts.placeholder.current.year));
	get initialPlaceholderYear() {
		return this.#initialPlaceholderYear();
	}
	set initialPlaceholderYear($$value) {
		return this.#initialPlaceholderYear($$value);
	}
	#defaultYears = derived(() => {
		return getDefaultYears({
			minValue: this.opts.minValue.current,
			maxValue: this.opts.maxValue.current,
			placeholderYear: this.initialPlaceholderYear
		});
	});
	get defaultYears() {
		return this.#defaultYears();
	}
	set defaultYears($$value) {
		return this.#defaultYears($$value);
	}
	#setupInitialFocusEffect() {}
	#setupAccessibleHeadingEffect() {}
	#setupFormatterEffect() {}
	/**
	* Navigates to the next page of the calendar.
	*/
	nextPage() {
		handleCalendarNextPage({
			fixedWeeks: this.opts.fixedWeeks.current,
			locale: this.opts.locale.current,
			numberOfMonths: this.opts.numberOfMonths.current,
			pagedNavigation: this.opts.pagedNavigation.current,
			setMonths: this.setMonths,
			setPlaceholder: (date) => this.opts.placeholder.current = date,
			weekStartsOn: this.opts.weekStartsOn.current,
			months: this.months
		});
	}
	/**
	* Navigates to the previous page of the calendar.
	*/
	prevPage() {
		handleCalendarPrevPage({
			fixedWeeks: this.opts.fixedWeeks.current,
			locale: this.opts.locale.current,
			numberOfMonths: this.opts.numberOfMonths.current,
			pagedNavigation: this.opts.pagedNavigation.current,
			setMonths: this.setMonths,
			setPlaceholder: (date) => this.opts.placeholder.current = date,
			weekStartsOn: this.opts.weekStartsOn.current,
			months: this.months
		});
	}
	nextYear() {
		this.opts.placeholder.current = this.opts.placeholder.current.add({ years: 1 });
	}
	prevYear() {
		this.opts.placeholder.current = this.opts.placeholder.current.subtract({ years: 1 });
	}
	setYear(year) {
		this.opts.placeholder.current = this.opts.placeholder.current.set({ year });
	}
	setMonth(month) {
		this.opts.placeholder.current = this.opts.placeholder.current.set({ month });
	}
	#isNextButtonDisabled = derived(() => {
		return getIsNextButtonDisabled({
			maxValue: this.opts.maxValue.current,
			months: this.months,
			disabled: this.opts.disabled.current
		});
	});
	get isNextButtonDisabled() {
		return this.#isNextButtonDisabled();
	}
	set isNextButtonDisabled($$value) {
		return this.#isNextButtonDisabled($$value);
	}
	#isPrevButtonDisabled = derived(() => {
		return getIsPrevButtonDisabled({
			minValue: this.opts.minValue.current,
			months: this.months,
			disabled: this.opts.disabled.current
		});
	});
	get isPrevButtonDisabled() {
		return this.#isPrevButtonDisabled();
	}
	set isPrevButtonDisabled($$value) {
		return this.#isPrevButtonDisabled($$value);
	}
	#isInvalid = derived(() => {
		const value = this.opts.value.current;
		const isDateDisabled = this.opts.isDateDisabled.current;
		const isDateUnavailable = this.opts.isDateUnavailable.current;
		if (Array.isArray(value)) {
			if (!value.length) return false;
			for (const date of value) {
				if (isDateDisabled(date)) return true;
				if (isDateUnavailable(date)) return true;
			}
		} else {
			if (!value) return false;
			if (isDateDisabled(value)) return true;
			if (isDateUnavailable(value)) return true;
		}
		return false;
	});
	get isInvalid() {
		return this.#isInvalid();
	}
	set isInvalid($$value) {
		return this.#isInvalid($$value);
	}
	#headingValue = derived(() => {
		this.opts.monthFormat.current;
		this.opts.yearFormat.current;
		return getCalendarHeadingValue({
			months: this.months,
			formatter: this.formatter,
			locale: this.opts.locale.current
		});
	});
	get headingValue() {
		return this.#headingValue();
	}
	set headingValue($$value) {
		return this.#headingValue($$value);
	}
	#fullCalendarLabel = derived(() => {
		return `${this.opts.calendarLabel.current} ${this.headingValue}`;
	});
	get fullCalendarLabel() {
		return this.#fullCalendarLabel();
	}
	set fullCalendarLabel($$value) {
		return this.#fullCalendarLabel($$value);
	}
	isOutsideVisibleMonths(date) {
		return !this.visibleMonths.some((month) => $ad063034c8620db8$export$a18c89cbd24170ff(date, month));
	}
	isDateDisabled(date) {
		if (this.opts.isDateDisabled.current(date) || this.opts.disabled.current) return true;
		const minValue = this.opts.minValue.current;
		const maxValue = this.opts.maxValue.current;
		if (minValue && isBefore(date, minValue)) return true;
		if (maxValue && isBefore(maxValue, date)) return true;
		return false;
	}
	isDateSelected(date) {
		const value = this.opts.value.current;
		if (Array.isArray(value)) return value.some((d) => $ad063034c8620db8$export$ea39ec197993aef0(d, date));
		else if (!value) return false;
		return $ad063034c8620db8$export$ea39ec197993aef0(value, date);
	}
	shiftFocus(node, add) {
		return shiftCalendarFocus({
			node,
			add,
			placeholder: this.opts.placeholder,
			calendarNode: this.opts.ref.current,
			isPrevButtonDisabled: this.isPrevButtonDisabled,
			isNextButtonDisabled: this.isNextButtonDisabled,
			months: this.months,
			numberOfMonths: this.opts.numberOfMonths.current
		});
	}
	#isMultipleSelectionValid(selectedDates) {
		if (this.opts.type.current !== "multiple") return true;
		if (!this.opts.maxDays.current) return true;
		const selectedCount = selectedDates.length;
		if (this.opts.maxDays.current && selectedCount > this.opts.maxDays.current) return false;
		return true;
	}
	handleCellClick(_, date) {
		if (this.opts.readonly.current || this.opts.isDateDisabled.current?.(date) || this.opts.isDateUnavailable.current?.(date)) return;
		const prev = this.opts.value.current;
		if (this.opts.type.current === "multiple") {
			if (Array.isArray(prev) || prev === void 0) this.opts.value.current = this.handleMultipleUpdate(prev, date);
		} else if (!Array.isArray(prev)) {
			const next = this.handleSingleUpdate(prev, date);
			if (!next) this.announcer.announce("Selected date is now empty.", "polite", 5e3);
			else this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(next, false)}`, "polite");
			this.opts.value.current = getDateWithPreviousTime(next, prev);
			if (next !== void 0) this.opts.onDateSelect?.current?.();
		}
	}
	handleMultipleUpdate(prev, date) {
		if (!prev) {
			const newSelection = [date];
			return this.#isMultipleSelectionValid(newSelection) ? newSelection : [date];
		}
		if (!Array.isArray(prev)) return;
		const index = prev.findIndex((d) => $ad063034c8620db8$export$ea39ec197993aef0(d, date));
		const preventDeselect = this.opts.preventDeselect.current;
		if (index === -1) {
			const newSelection = [...prev, date];
			if (this.#isMultipleSelectionValid(newSelection)) return newSelection;
			else return [date];
		} else if (preventDeselect) return prev;
		else {
			const next = prev.filter((d) => !$ad063034c8620db8$export$ea39ec197993aef0(d, date));
			if (!next.length) {
				this.opts.placeholder.current = date;
				return;
			}
			return next;
		}
	}
	handleSingleUpdate(prev, date) {
		if (!prev) return date;
		if (!this.opts.preventDeselect.current && $ad063034c8620db8$export$ea39ec197993aef0(prev, date)) {
			this.opts.placeholder.current = date;
			return;
		}
		return date;
	}
	onkeydown(event) {
		handleCalendarKeydown({
			event,
			handleCellClick: this.handleCellClick,
			shiftFocus: this.shiftFocus,
			placeholderValue: this.opts.placeholder.current
		});
	}
	#snippetProps = derived(() => ({
		months: this.months,
		weekdays: this.weekdays
	}));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	getBitsAttr = (part) => {
		return calendarAttrs.getAttr(part);
	};
	#props = derived(() => ({
		...getCalendarElementProps({
			fullCalendarLabel: this.fullCalendarLabel,
			id: this.opts.id.current,
			isInvalid: this.isInvalid,
			disabled: this.opts.disabled.current,
			readonly: this.opts.readonly.current
		}),
		[this.getBitsAttr("root")]: "",
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarCellContext = new Context("Calendar.Cell | RangeCalendar.Cell");
var CalendarCellState = class CalendarCellState {
	static create(opts) {
		return CalendarCellContext.set(new CalendarCellState(opts, CalendarRootContext.get()));
	}
	opts;
	root;
	#cellDate = derived(() => toDate(this.opts.date.current));
	get cellDate() {
		return this.#cellDate();
	}
	set cellDate($$value) {
		return this.#cellDate($$value);
	}
	#isUnavailable = derived(() => this.root.opts.isDateUnavailable.current(this.opts.date.current));
	get isUnavailable() {
		return this.#isUnavailable();
	}
	set isUnavailable($$value) {
		return this.#isUnavailable($$value);
	}
	#isDateToday = derived(() => $ad063034c8620db8$export$629b0a497aa65267(this.opts.date.current, $ad063034c8620db8$export$aa8b41735afcabd2()));
	get isDateToday() {
		return this.#isDateToday();
	}
	set isDateToday($$value) {
		return this.#isDateToday($$value);
	}
	#isOutsideMonth = derived(() => !$ad063034c8620db8$export$a18c89cbd24170ff(this.opts.date.current, this.opts.month.current));
	get isOutsideMonth() {
		return this.#isOutsideMonth();
	}
	set isOutsideMonth($$value) {
		return this.#isOutsideMonth($$value);
	}
	#isOutsideVisibleMonths = derived(() => this.root.isOutsideVisibleMonths(this.opts.date.current));
	get isOutsideVisibleMonths() {
		return this.#isOutsideVisibleMonths();
	}
	set isOutsideVisibleMonths($$value) {
		return this.#isOutsideVisibleMonths($$value);
	}
	#isDisabled = derived(() => this.root.isDateDisabled(this.opts.date.current) || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current);
	get isDisabled() {
		return this.#isDisabled();
	}
	set isDisabled($$value) {
		return this.#isDisabled($$value);
	}
	#isFocusedDate = derived(() => $ad063034c8620db8$export$ea39ec197993aef0(this.opts.date.current, this.root.opts.placeholder.current));
	get isFocusedDate() {
		return this.#isFocusedDate();
	}
	set isFocusedDate($$value) {
		return this.#isFocusedDate($$value);
	}
	#isSelectedDate = derived(() => this.root.isDateSelected(this.opts.date.current));
	get isSelectedDate() {
		return this.#isSelectedDate();
	}
	set isSelectedDate($$value) {
		return this.#isSelectedDate($$value);
	}
	#labelText = derived(() => this.root.formatter.custom(this.cellDate, {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	}));
	get labelText() {
		return this.#labelText();
	}
	set labelText($$value) {
		return this.#labelText($$value);
	}
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#snippetProps = derived(() => ({
		disabled: this.isDisabled,
		unavailable: this.isUnavailable,
		selected: this.isSelectedDate,
		day: `${this.opts.date.current.day}`
	}));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#ariaDisabled = derived(() => {
		return this.isDisabled || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current || this.isUnavailable;
	});
	get ariaDisabled() {
		return this.#ariaDisabled();
	}
	set ariaDisabled($$value) {
		return this.#ariaDisabled($$value);
	}
	#sharedDataAttrs = derived(() => ({
		"data-unavailable": boolToEmptyStrOrUndef(this.isUnavailable),
		"data-today": this.isDateToday ? "" : void 0,
		"data-outside-month": this.isOutsideMonth ? "" : void 0,
		"data-outside-visible-months": this.isOutsideVisibleMonths ? "" : void 0,
		"data-focused": this.isFocusedDate ? "" : void 0,
		"data-selected": boolToEmptyStrOrUndef(this.isSelectedDate),
		"data-value": this.opts.date.current.toString(),
		"data-type": getDateValueType(this.opts.date.current),
		"data-disabled": boolToEmptyStrOrUndef(this.isDisabled || this.isOutsideMonth && this.root.opts.disableDaysOutsideMonth.current)
	}));
	get sharedDataAttrs() {
		return this.#sharedDataAttrs();
	}
	set sharedDataAttrs($$value) {
		return this.#sharedDataAttrs($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "gridcell",
		"aria-selected": boolToStr(this.isSelectedDate),
		"aria-disabled": boolToStr(this.ariaDisabled),
		...this.sharedDataAttrs,
		[this.root.getBitsAttr("cell")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarDayState = class CalendarDayState {
	static create(opts) {
		return new CalendarDayState(opts, CalendarCellContext.get());
	}
	opts;
	cell;
	attachment;
	constructor(opts, cell) {
		this.opts = opts;
		this.cell = cell;
		this.onclick = this.onclick.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	#tabindex = derived(() => this.cell.isOutsideMonth && this.cell.root.opts.disableDaysOutsideMonth.current || this.cell.isDisabled ? void 0 : this.cell.isFocusedDate ? 0 : -1);
	onclick(e) {
		if (this.cell.isDisabled) return;
		this.cell.root.handleCellClick(e, this.cell.opts.date.current);
	}
	#snippetProps = derived(() => ({
		disabled: this.cell.isDisabled,
		unavailable: this.cell.isUnavailable,
		selected: this.cell.isSelectedDate,
		day: `${this.cell.opts.date.current.day}`
	}));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "button",
		"aria-label": this.cell.labelText,
		"aria-disabled": boolToStr(this.cell.ariaDisabled),
		...this.cell.sharedDataAttrs,
		tabindex: this.#tabindex(),
		[this.cell.root.getBitsAttr("day")]: "",
		"data-bits-day": "",
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarNextButtonState = class CalendarNextButtonState {
	static create(opts) {
		return new CalendarNextButtonState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	#isDisabled = derived(() => this.root.isNextButtonDisabled);
	get isDisabled() {
		return this.#isDisabled();
	}
	set isDisabled($$value) {
		return this.#isDisabled($$value);
	}
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.onclick = this.onclick.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	onclick(_) {
		if (this.isDisabled) return;
		this.root.nextPage();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "button",
		type: "button",
		"aria-label": "Next",
		"aria-disabled": boolToStr(this.isDisabled),
		"data-disabled": boolToEmptyStrOrUndef(this.isDisabled),
		disabled: this.isDisabled,
		[this.root.getBitsAttr("next-button")]: "",
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarPrevButtonState = class CalendarPrevButtonState {
	static create(opts) {
		return new CalendarPrevButtonState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	#isDisabled = derived(() => this.root.isPrevButtonDisabled);
	get isDisabled() {
		return this.#isDisabled();
	}
	set isDisabled($$value) {
		return this.#isDisabled($$value);
	}
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.onclick = this.onclick.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	onclick(_) {
		if (this.isDisabled) return;
		this.root.prevPage();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "button",
		type: "button",
		"aria-label": "Previous",
		"aria-disabled": boolToStr(this.isDisabled),
		"data-disabled": boolToEmptyStrOrUndef(this.isDisabled),
		disabled: this.isDisabled,
		[this.root.getBitsAttr("prev-button")]: "",
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarGridState = class CalendarGridState {
	static create(opts) {
		return new CalendarGridState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		tabindex: -1,
		role: "grid",
		"aria-readonly": boolToStr(this.root.opts.readonly.current),
		"aria-disabled": boolToStr(this.root.opts.disabled.current),
		"data-readonly": boolToEmptyStrOrUndef(this.root.opts.readonly.current),
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		[this.root.getBitsAttr("grid")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarGridBodyState = class CalendarGridBodyState {
	static create(opts) {
		return new CalendarGridBodyState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-readonly": boolToEmptyStrOrUndef(this.root.opts.readonly.current),
		[this.root.getBitsAttr("grid-body")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarGridHeadState = class CalendarGridHeadState {
	static create(opts) {
		return new CalendarGridHeadState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-readonly": boolToEmptyStrOrUndef(this.root.opts.readonly.current),
		[this.root.getBitsAttr("grid-head")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarGridRowState = class CalendarGridRowState {
	static create(opts) {
		return new CalendarGridRowState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-readonly": boolToEmptyStrOrUndef(this.root.opts.readonly.current),
		[this.root.getBitsAttr("grid-row")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarHeadCellState = class CalendarHeadCellState {
	static create(opts) {
		return new CalendarHeadCellState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-readonly": boolToEmptyStrOrUndef(this.root.opts.readonly.current),
		[this.root.getBitsAttr("head-cell")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarHeaderState = class CalendarHeaderState {
	static create(opts) {
		return new CalendarHeaderState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		"data-readonly": boolToEmptyStrOrUndef(this.root.opts.readonly.current),
		[this.root.getBitsAttr("header")]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarMonthSelectState = class CalendarMonthSelectState {
	static create(opts) {
		return new CalendarMonthSelectState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.onchange = this.onchange.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	#monthItems = derived(() => {
		this.root.opts.locale.current;
		const monthNumbers = this.opts.months.current;
		const monthFormat = this.opts.monthFormat.current;
		const months = [];
		for (const month of monthNumbers) {
			const date = this.root.opts.placeholder.current.set({ month });
			let label;
			if (typeof monthFormat === "function") label = monthFormat(month);
			else label = this.root.formatter.custom(toDate(date), { month: monthFormat });
			months.push({
				value: month,
				label
			});
		}
		return months;
	});
	get monthItems() {
		return this.#monthItems();
	}
	set monthItems($$value) {
		return this.#monthItems($$value);
	}
	#currentMonth = derived(() => this.root.opts.placeholder.current.month);
	get currentMonth() {
		return this.#currentMonth();
	}
	set currentMonth($$value) {
		return this.#currentMonth($$value);
	}
	#isDisabled = derived(() => this.root.opts.disabled.current || this.opts.disabled.current);
	get isDisabled() {
		return this.#isDisabled();
	}
	set isDisabled($$value) {
		return this.#isDisabled($$value);
	}
	#snippetProps = derived(() => {
		return {
			monthItems: this.monthItems,
			selectedMonthItem: this.monthItems.find((month) => month.value === this.currentMonth)
		};
	});
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	onchange(event) {
		if (this.isDisabled) return;
		const target = event.target;
		const month = parseInt(target.value, 10);
		if (!isNaN(month)) this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ month });
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		value: this.currentMonth,
		disabled: this.isDisabled,
		"data-disabled": boolToEmptyStrOrUndef(this.isDisabled),
		[this.root.getBitsAttr("month-select")]: "",
		onchange: this.onchange,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CalendarYearSelectState = class CalendarYearSelectState {
	static create(opts) {
		return new CalendarYearSelectState(opts, CalendarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.onchange = this.onchange.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	#years = derived(() => {
		if (this.opts.years.current && this.opts.years.current.length) return this.opts.years.current;
		return this.root.defaultYears;
	});
	get years() {
		return this.#years();
	}
	set years($$value) {
		return this.#years($$value);
	}
	#yearItems = derived(() => {
		this.root.opts.locale.current;
		const yearFormat = this.opts.yearFormat.current;
		const localYears = [];
		for (const year of this.years) {
			const date = this.root.opts.placeholder.current.set({ year });
			let label;
			if (typeof yearFormat === "function") label = yearFormat(year);
			else label = this.root.formatter.custom(toDate(date), { year: yearFormat });
			localYears.push({
				value: year,
				label
			});
		}
		return localYears;
	});
	get yearItems() {
		return this.#yearItems();
	}
	set yearItems($$value) {
		return this.#yearItems($$value);
	}
	#currentYear = derived(() => this.root.opts.placeholder.current.year);
	get currentYear() {
		return this.#currentYear();
	}
	set currentYear($$value) {
		return this.#currentYear($$value);
	}
	#isDisabled = derived(() => this.root.opts.disabled.current || this.opts.disabled.current);
	get isDisabled() {
		return this.#isDisabled();
	}
	set isDisabled($$value) {
		return this.#isDisabled($$value);
	}
	#snippetProps = derived(() => {
		return {
			yearItems: this.yearItems,
			selectedYearItem: this.yearItems.find((year) => year.value === this.currentYear)
		};
	});
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	onchange(event) {
		if (this.isDisabled) return;
		const target = event.target;
		const year = parseInt(target.value, 10);
		if (!isNaN(year)) this.root.opts.placeholder.current = this.root.opts.placeholder.current.set({ year });
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		value: this.currentYear,
		disabled: this.isDisabled,
		"data-disabled": boolToEmptyStrOrUndef(this.isDisabled),
		[this.root.getBitsAttr("year-select")]: "",
		onchange: this.onchange,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar.svelte
function Calendar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { child, children, id = useId(), ref = null, value = void 0, onValueChange = noop, placeholder = void 0, onPlaceholderChange = noop, weekdayFormat = "narrow", weekStartsOn, pagedNavigation = false, isDateDisabled = () => false, isDateUnavailable = () => false, fixedWeeks = false, numberOfMonths = 1, locale, calendarLabel = "Event", disabled = false, readonly = false, minValue = void 0, maxValue = void 0, preventDeselect = false, type, disableDaysOutsideMonth = true, initialFocus = false, maxDays, monthFormat = "long", yearFormat = "numeric", $$slots, $$events, ...restProps } = $$props;
		const defaultPlaceholder = getDefaultDate({
			defaultValue: value,
			minValue,
			maxValue
		});
		function handleDefaultPlaceholder() {
			if (placeholder !== void 0) return;
			placeholder = defaultPlaceholder;
		}
		handleDefaultPlaceholder();
		watch.pre(() => placeholder, () => {
			handleDefaultPlaceholder();
		});
		function handleDefaultValue() {
			if (value !== void 0) return;
			value = type === "single" ? void 0 : [];
		}
		handleDefaultValue();
		watch.pre(() => value, () => {
			handleDefaultValue();
		});
		const rootState = CalendarRootState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			weekdayFormat: boxWith(() => weekdayFormat),
			weekStartsOn: boxWith(() => weekStartsOn),
			pagedNavigation: boxWith(() => pagedNavigation),
			isDateDisabled: boxWith(() => isDateDisabled),
			isDateUnavailable: boxWith(() => isDateUnavailable),
			fixedWeeks: boxWith(() => fixedWeeks),
			numberOfMonths: boxWith(() => numberOfMonths),
			locale: resolveLocaleProp(() => locale),
			calendarLabel: boxWith(() => calendarLabel),
			readonly: boxWith(() => readonly),
			disabled: boxWith(() => disabled),
			minValue: boxWith(() => minValue),
			maxValue: boxWith(() => maxValue),
			disableDaysOutsideMonth: boxWith(() => disableDaysOutsideMonth),
			initialFocus: boxWith(() => initialFocus),
			maxDays: boxWith(() => maxDays),
			placeholder: boxWith(() => placeholder, (v) => {
				placeholder = v;
				onPlaceholderChange(v);
			}),
			preventDeselect: boxWith(() => preventDeselect),
			value: boxWith(() => value, (v) => {
				value = v;
				onValueChange(v);
			}),
			type: boxWith(() => type),
			monthFormat: boxWith(() => monthFormat),
			yearFormat: boxWith(() => yearFormat),
			defaultPlaceholder
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				props: mergedProps(),
				...rootState.snippetProps
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer, rootState.snippetProps);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			ref,
			value,
			placeholder
		});
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-day.svelte
function Calendar_day$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const dayState = CalendarDayState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, dayState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				props: mergedProps(),
				...dayState.snippetProps
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			if (children) {
				$$renderer.push("<!--[0-->");
				children?.($$renderer, dayState.snippetProps);
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(dayState.cell.opts.date.current.day)}`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-grid.svelte
function Calendar_grid$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const gridState = CalendarGridState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, gridState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<table${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></table>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-grid-body.svelte
function Calendar_grid_body$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const gridBodyState = CalendarGridBodyState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, gridBodyState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<tbody${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></tbody>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-cell.svelte
function Calendar_cell$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), date, month, $$slots, $$events, ...restProps } = $$props;
		const cellState = CalendarCellState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			date: boxWith(() => date),
			month: boxWith(() => month)
		});
		const mergedProps = derived(() => mergeProps(restProps, cellState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				props: mergedProps(),
				...cellState.snippetProps
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<td${attributes({ ...mergedProps() })}>`);
			children?.($$renderer, cellState.snippetProps);
			$$renderer.push(`<!----></td>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-grid-head.svelte
function Calendar_grid_head$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const gridHeadState = CalendarGridHeadState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, gridHeadState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<thead${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></thead>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-head-cell.svelte
function Calendar_head_cell$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const headCellState = CalendarHeadCellState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, headCellState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<th${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></th>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-grid-row.svelte
function Calendar_grid_row$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const gridRowState = CalendarGridRowState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, gridRowState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<tr${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></tr>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-header.svelte
function Calendar_header$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const headerState = CalendarHeaderState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, headerState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<header${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></header>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-month-select.svelte
function Calendar_month_select$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), months = [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12
		], monthFormat = "long", disabled = false, "aria-label": ariaLabel = "Select a month", $$slots, $$events, ...restProps } = $$props;
		const monthSelectState = CalendarMonthSelectState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			months: boxWith(() => months),
			monthFormat: boxWith(() => monthFormat),
			disabled: boxWith(() => Boolean(disabled))
		});
		const mergedProps = derived(() => mergeProps(restProps, monthSelectState.props, { "aria-label": ariaLabel }));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				props: mergedProps(),
				...monthSelectState.snippetProps
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.select({ ...mergedProps() }, ($$renderer) => {
				if (children) {
					$$renderer.push("<!--[0-->");
					children?.($$renderer, monthSelectState.snippetProps);
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--[-->`);
					const each_array = ensure_array_like(monthSelectState.monthItems);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let month = each_array[$$index];
						$$renderer.option({
							value: month.value,
							selected: month.value === monthSelectState.currentMonth
						}, ($$renderer) => {
							$$renderer.push(`${escape_html(month.label)}`);
						});
					}
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]-->`);
			}, void 0, void 0, void 0, void 0, true);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-next-button.svelte
function Calendar_next_button$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, tabindex = 0, $$slots, $$events, ...restProps } = $$props;
		const nextButtonState = CalendarNextButtonState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, nextButtonState.props, { tabindex }));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-prev-button.svelte
function Calendar_prev_button$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, tabindex = 0, $$slots, $$events, ...restProps } = $$props;
		const prevButtonState = CalendarPrevButtonState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, prevButtonState.props, { tabindex }));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/calendar/components/calendar-year-select.svelte
function Calendar_year_select$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), years, yearFormat = "numeric", disabled = false, "aria-label": ariaLabel = "Select a year", $$slots, $$events, ...restProps } = $$props;
		const yearSelectState = CalendarYearSelectState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			years: boxWith(() => years),
			yearFormat: boxWith(() => yearFormat),
			disabled: boxWith(() => Boolean(disabled))
		});
		const mergedProps = derived(() => mergeProps(restProps, yearSelectState.props, { "aria-label": ariaLabel }));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				props: mergedProps(),
				...yearSelectState.snippetProps
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.select({ ...mergedProps() }, ($$renderer) => {
				if (children) {
					$$renderer.push("<!--[0-->");
					children?.($$renderer, yearSelectState.snippetProps);
					$$renderer.push(`<!---->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--[-->`);
					const each_array = ensure_array_like(yearSelectState.yearItems);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let year = each_array[$$index];
						$$renderer.option({
							value: year.value,
							selected: year.value === yearSelectState.currentYear
						}, ($$renderer) => {
							$$renderer.push(`${escape_html(year.label)}`);
						});
					}
					$$renderer.push(`<!--]-->`);
				}
				$$renderer.push(`<!--]-->`);
			}, void 0, void 0, void 0, void 0, true);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/formComponents/FileUpload.svelte
function FileUpload($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { form, name, placeholder = "PDF or Images (Max 10MB)", image = "" } = $$props;
		let file = fileProxy(form, name);
		let isDragging = false;
		let isProcessing = false;
		async function handleFileSelection(files) {
			if (!files || files.length === 0) return;
			isProcessing = true;
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
				initialQuality: .8
			};
			try {
				const processedFiles = await Promise.all(Array.from(files).map(async (f) => {
					if (f.type === "application/pdf") return f;
					try {
						const compressed = await imageCompression(f, options);
						return new File([compressed], f.name, { type: compressed.type });
					} catch (err) {
						console.error("Compression error:", err);
						return f;
					}
				}));
				const dt = new DataTransfer();
				processedFiles.forEach((f) => dt.items.add(f));
				file.set(dt.files);
			} catch (err) {
				console.error("FULL ERROR:", err);
			} finally {
				isProcessing = false;
			}
		}
		function handleDrop(e) {
			e.preventDefault();
			isDragging = false;
			if (e.dataTransfer?.files) handleFileSelection(e.dataTransfer.files);
		}
		function handleDragOver(e) {
			e.preventDefault();
			isDragging = true;
		}
		function handleDragLeave() {
			isDragging = false;
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="flex w-full flex-col gap-3">`);
			Input($$renderer, {
				id: name,
				type: "file",
				class: "hidden",
				name,
				accept: "image/*,application/pdf",
				onchange: (e) => handleFileSelection(e.currentTarget.files),
				multiple: false,
				get files() {
					return store_get($$store_subs ??= {}, "$file", file);
				},
				set files($$value) {
					store_set(file, $$value);
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (store_get($$store_subs ??= {}, "$file", file)?.length === 0 && image === "") {
				$$renderer.push("<!--[0-->");
				Label($$renderer, {
					for: name,
					class: `group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-2! transition-all
            ${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted"}`,
					ondragover: handleDragOver,
					ondragleave: handleDragLeave,
					ondrop: handleDrop,
					children: ($$renderer) => {
						$$renderer.push(`<div class="flex flex-col items-center justify-center gap-2 text-center"><div class="rounded-full bg-background p-3 shadow-sm transition-transform group-hover:scale-110">`);
						if (isProcessing) {
							$$renderer.push("<!--[0-->");
							Loader($$renderer, { class: "h-6 w-6 animate-spin text-primary" });
						} else {
							$$renderer.push("<!--[-1-->");
							Cloud_upload($$renderer, { class: `h-6 w-6 ${isDragging ? "text-primary" : "text-muted-foreground"}` });
						}
						$$renderer.push(`<!--]--></div> <div class="px-4"><p class="text-sm font-medium">`);
						if (isProcessing) {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`Optimizing file...`);
						} else {
							$$renderer.push("<!--[-1-->");
							$$renderer.push(`${escape_html(isDragging ? "Drop it here!" : "Click to upload or drag and drop")}`);
						}
						$$renderer.push(`<!--]--></p> <p class="text-[12px]! text-muted-foreground">${escape_html(placeholder)}</p></div></div>`);
					},
					$$slots: { default: true }
				});
			} else if (image && store_get($$store_subs ??= {}, "$file", file)?.length === 0) {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<div class="relative animate-in overflow-hidden rounded-xl border bg-card p-4 shadow-sm duration-200 zoom-in-95 fade-in"><div class="mb-3 flex items-center justify-between"><div class="flex items-center gap-3 overflow-hidden"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
				if (image.toLowerCase().endsWith(".pdf")) {
					$$renderer.push("<!--[0-->");
					File_text($$renderer, { class: "h-5 w-5" });
				} else {
					$$renderer.push("<!--[-1-->");
					Image($$renderer, { class: "h-5 w-5" });
				}
				$$renderer.push(`<!--]--></div> <div class="flex flex-col truncate"><span class="truncate text-sm font-medium">${escape_html(image)}</span></div></div> `);
				Button($$renderer, {
					variant: "ghost",
					size: "icon",
					class: "hover:text-destructive-foreground h-8 w-8 rounded-full hover:bg-destructive",
					onclick: () => {
						file.set(void 0);
						image = "";
					},
					children: ($$renderer) => {
						X($$renderer, { class: "h-4 w-4" });
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <div class="rounded-lg border bg-muted/30">`);
				if (image.toLowerCase().endsWith(".pdf")) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<iframe${attr("src", `/files/${stringify$1(image)}`)} class="h-64 w-full" frameborder="0" title="pdf-preview"></iframe>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<img${attr("src", `/files/${stringify$1(image)}`)} alt="Preview" class="h-full w-full object-cover"/>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="relative animate-in overflow-hidden rounded-xl border bg-card p-4 shadow-sm duration-200 zoom-in-95 fade-in"><div class="mb-3 flex items-center justify-between"><div class="flex items-center gap-3 overflow-hidden"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">`);
				if (store_get($$store_subs ??= {}, "$file", file)[0]?.type === "application/pdf") {
					$$renderer.push("<!--[0-->");
					File_text($$renderer, { class: "h-5 w-5" });
				} else {
					$$renderer.push("<!--[-1-->");
					Image($$renderer, { class: "h-5 w-5" });
				}
				$$renderer.push(`<!--]--></div> <div class="flex flex-col truncate"><span class="truncate text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$file", file)[0]?.name)}</span> <span class="text-xs text-muted-foreground">${escape_html((store_get($$store_subs ??= {}, "$file", file)[0]?.size / 1024 / 1024).toFixed(2))} MB (Optimized)</span></div></div> `);
				Button($$renderer, {
					variant: "ghost",
					size: "icon",
					class: "hover:text-destructive-foreground h-8 w-8 rounded-full hover:bg-destructive",
					onclick: () => file.set(void 0),
					children: ($$renderer) => {
						X($$renderer, { class: "h-4 w-4" });
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <div class="overflow-hidden rounded-lg border bg-muted/30">`);
				if (store_get($$store_subs ??= {}, "$file", file)[0]?.type === "application/pdf") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<iframe${attr("src", URL.createObjectURL(store_get($$store_subs ??= {}, "$file", file)[0]) + "#toolbar=0")} class="h-64 w-full" frameborder="0" title="pdf-preview"></iframe>`);
				} else if (store_get($$store_subs ??= {}, "$file", file)[0]?.type.startsWith("image/")) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<img${attr("src", URL.createObjectURL(store_get($$store_subs ??= {}, "$file", file)[0]))} alt="Preview" class="h-full w-full object-cover"/>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar.svelte
function Calendar_1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, value = void 0, placeholder = void 0, class: className, weekdayFormat = "short", buttonVariant = "ghost", captionLayout = "label", locale = "en-US", months: monthsProp, years, monthFormat: monthFormatProp, yearFormat = "numeric", day, disableDaysOutsideMonth = false, $$slots, $$events, ...restProps } = $$props;
		const monthFormat = derived(() => {
			if (monthFormatProp) return monthFormatProp;
			if (captionLayout.startsWith("dropdown")) return "short";
			return "long";
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			{
				function children($$renderer, { months, weekdays }) {
					if (Calendar_months) {
						$$renderer.push("<!--[-->");
						Calendar_months($$renderer, {
							children: ($$renderer) => {
								if (Calendar_nav) {
									$$renderer.push("<!--[-->");
									Calendar_nav($$renderer, {
										children: ($$renderer) => {
											if (Calendar_prev_button) {
												$$renderer.push("<!--[-->");
												Calendar_prev_button($$renderer, { variant: buttonVariant });
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
											$$renderer.push(` `);
											if (Calendar_next_button) {
												$$renderer.push("<!--[-->");
												Calendar_next_button($$renderer, { variant: buttonVariant });
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(` <!--[-->`);
								const each_array = ensure_array_like(months);
								for (let monthIndex = 0, $$length = each_array.length; monthIndex < $$length; monthIndex++) {
									let month = each_array[monthIndex];
									if (Calendar_month) {
										$$renderer.push("<!--[-->");
										Calendar_month($$renderer, {
											children: ($$renderer) => {
												if (Calendar_header) {
													$$renderer.push("<!--[-->");
													Calendar_header($$renderer, {
														children: ($$renderer) => {
															if (Calendar_caption) {
																$$renderer.push("<!--[-->");
																Calendar_caption($$renderer, {
																	captionLayout,
																	months: monthsProp,
																	monthFormat: monthFormat(),
																	years,
																	yearFormat,
																	month: month.value,
																	locale,
																	monthIndex,
																	get placeholder() {
																		return placeholder;
																	},
																	set placeholder($$value) {
																		placeholder = $$value;
																		$$settled = false;
																	}
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Calendar_grid) {
													$$renderer.push("<!--[-->");
													Calendar_grid($$renderer, {
														children: ($$renderer) => {
															if (Calendar_grid_head) {
																$$renderer.push("<!--[-->");
																Calendar_grid_head($$renderer, {
																	children: ($$renderer) => {
																		if (Calendar_grid_row) {
																			$$renderer.push("<!--[-->");
																			Calendar_grid_row($$renderer, {
																				class: "select-none",
																				children: ($$renderer) => {
																					$$renderer.push(`<!--[-->`);
																					const each_array_1 = ensure_array_like(weekdays);
																					for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
																						let weekday = each_array_1[i];
																						if (Calendar_head_cell) {
																							$$renderer.push("<!--[-->");
																							Calendar_head_cell($$renderer, {
																								children: ($$renderer) => {
																									$$renderer.push(`<!---->${escape_html(weekday.slice(0, 2))}`);
																								},
																								$$slots: { default: true }
																							});
																							$$renderer.push("<!--]-->");
																						} else {
																							$$renderer.push("<!--[!-->");
																							$$renderer.push("<!--]-->");
																						}
																					}
																					$$renderer.push(`<!--]-->`);
																				},
																				$$slots: { default: true }
																			});
																			$$renderer.push("<!--]-->");
																		} else {
																			$$renderer.push("<!--[!-->");
																			$$renderer.push("<!--]-->");
																		}
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Calendar_grid_body) {
																$$renderer.push("<!--[-->");
																Calendar_grid_body($$renderer, {
																	children: ($$renderer) => {
																		$$renderer.push(`<!--[-->`);
																		const each_array_2 = ensure_array_like(month.weeks);
																		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
																			let weekDates = each_array_2[$$index_2];
																			if (Calendar_grid_row) {
																				$$renderer.push("<!--[-->");
																				Calendar_grid_row($$renderer, {
																					class: "mt-2 w-full",
																					children: ($$renderer) => {
																						$$renderer.push(`<!--[-->`);
																						const each_array_3 = ensure_array_like(weekDates);
																						for (let $$index_1 = 0, $$length = each_array_3.length; $$index_1 < $$length; $$index_1++) {
																							let date = each_array_3[$$index_1];
																							if (Calendar_cell) {
																								$$renderer.push("<!--[-->");
																								Calendar_cell($$renderer, {
																									date,
																									month: month.value,
																									children: ($$renderer) => {
																										if (day) {
																											$$renderer.push("<!--[0-->");
																											day($$renderer, {
																												day: date,
																												outsideMonth: !$ad063034c8620db8$export$5a8da0c44a3afdf2(date, month.value)
																											});
																											$$renderer.push(`<!---->`);
																										} else {
																											$$renderer.push("<!--[-1-->");
																											if (Calendar_day) {
																												$$renderer.push("<!--[-->");
																												Calendar_day($$renderer, {});
																												$$renderer.push("<!--]-->");
																											} else {
																												$$renderer.push("<!--[!-->");
																												$$renderer.push("<!--]-->");
																											}
																										}
																										$$renderer.push(`<!--]-->`);
																									},
																									$$slots: { default: true }
																								});
																								$$renderer.push("<!--]-->");
																							} else {
																								$$renderer.push("<!--[!-->");
																								$$renderer.push("<!--]-->");
																							}
																						}
																						$$renderer.push(`<!--]-->`);
																					},
																					$$slots: { default: true }
																				});
																				$$renderer.push("<!--]-->");
																			} else {
																				$$renderer.push("<!--[!-->");
																				$$renderer.push("<!--]-->");
																			}
																		}
																		$$renderer.push(`<!--]-->`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								}
								$$renderer.push(`<!--]-->`);
							},
							$$slots: { default: true }
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				}
				if (Calendar) {
					$$renderer.push("<!--[-->");
					Calendar($$renderer, spread_props([
						{
							weekdayFormat,
							disableDaysOutsideMonth,
							class: cn("p-2 [--cell-radius:var(--radius-md)] [--cell-size:--spacing(7)] bg-background group/calendar in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent", className),
							locale,
							monthFormat: monthFormat(),
							yearFormat
						},
						restProps,
						{
							get value() {
								return value;
							},
							set value($$value) {
								value = $$value;
								$$settled = false;
							},
							get ref() {
								return ref;
							},
							set ref($$value) {
								ref = $$value;
								$$settled = false;
							},
							get placeholder() {
								return placeholder;
							},
							set placeholder($$value) {
								placeholder = $$value;
								$$settled = false;
							},
							children,
							$$slots: { default: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			value,
			placeholder
		});
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-cell.svelte
function Calendar_cell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_cell$1) {
				$$renderer.push("<!--[-->");
				Calendar_cell$1($$renderer, spread_props([
					{ class: cn("relative size-(--cell-size) p-0 text-center text-sm focus-within:z-20 [&:first-child[data-selected]_[data-bits-day]]:rounded-s-(--cell-radius) [&:last-child[data-selected]_[data-bits-day]]:rounded-e-(--cell-radius)", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-day.svelte
function Calendar_day($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_day$1) {
				$$renderer.push("<!--[-->");
				Calendar_day$1($$renderer, spread_props([
					{ class: cn("flex size-(--cell-size) flex-col items-center justify-center gap-1 rounded-(--cell-radius) p-0 leading-none font-normal whitespace-nowrap select-none", "[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)", "not-data-selected:hover:bg-accent/50 not-data-selected:hover:text-accent-foreground", "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground [&[data-today][data-disabled]]:text-muted-foreground", "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:text-foreground", "[&[data-outside-month]:not([data-selected])]:text-muted-foreground [&[data-outside-month]:not([data-selected])]:hover:text-accent-foreground", "data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", "data-[unavailable]:text-muted-foreground data-[unavailable]:line-through", "focus:border-ring focus:ring-ring/50 focus:relative", "[&>span]:text-xs [&>span]:opacity-70", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-grid.svelte
function Calendar_grid($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_grid$1) {
				$$renderer.push("<!--[-->");
				Calendar_grid$1($$renderer, spread_props([
					{ class: cn("flex w-full border-collapse flex-col", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-header.svelte
function Calendar_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_header$1) {
				$$renderer.push("<!--[-->");
				Calendar_header$1($$renderer, spread_props([
					{ class: cn("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-months.svelte
function Calendar_months($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			class: clsx$1(cn("relative flex flex-col gap-4 md:flex-row", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-grid-row.svelte
function Calendar_grid_row($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_grid_row$1) {
				$$renderer.push("<!--[-->");
				Calendar_grid_row$1($$renderer, spread_props([
					{ class: cn("flex", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-grid-body.svelte
function Calendar_grid_body($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_grid_body$1) {
				$$renderer.push("<!--[-->");
				Calendar_grid_body$1($$renderer, spread_props([
					{ class: cn(className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-grid-head.svelte
function Calendar_grid_head($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_grid_head$1) {
				$$renderer.push("<!--[-->");
				Calendar_grid_head$1($$renderer, spread_props([
					{ class: cn(className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-head-cell.svelte
function Calendar_head_cell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_head_cell$1) {
				$$renderer.push("<!--[-->");
				Calendar_head_cell$1($$renderer, spread_props([
					{ class: cn("text-muted-foreground w-(--cell-size) rounded-md text-[0.8rem] font-normal", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-next-button.svelte
function Calendar_next_button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, variant = "ghost", $$slots, $$events, ...restProps } = $$props;
		function Fallback($$renderer) {
			Chevron_right($$renderer, { class: cn("size-4", className) });
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_next_button$1) {
				$$renderer.push("<!--[-->");
				Calendar_next_button$1($$renderer, spread_props([
					{ class: cn(buttonVariants({ variant }), "size-(--cell-size) bg-transparent p-0 select-none disabled:opacity-50 rtl:rotate-180", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							if (children) {
								$$renderer.push("<!--[0-->");
								children?.($$renderer);
								$$renderer.push(`<!---->`);
							} else {
								$$renderer.push("<!--[-1-->");
								Fallback($$renderer);
							}
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-prev-button.svelte
function Calendar_prev_button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, variant = "ghost", $$slots, $$events, ...restProps } = $$props;
		function Fallback($$renderer) {
			Chevron_left($$renderer, { class: cn("size-4", className) });
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Calendar_prev_button$1) {
				$$renderer.push("<!--[-->");
				Calendar_prev_button$1($$renderer, spread_props([
					{ class: cn(buttonVariants({ variant }), "size-(--cell-size) bg-transparent p-0 select-none disabled:opacity-50 rtl:rotate-180", className) },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							if (children) {
								$$renderer.push("<!--[0-->");
								children?.($$renderer);
								$$renderer.push(`<!---->`);
							} else {
								$$renderer.push("<!--[-1-->");
								Fallback($$renderer);
							}
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					}
				]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-month-select.svelte
function Calendar_month_select($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, value, onchange, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<span${attr_class(clsx$1(cn("has-focus:border-ring border-input has-focus:ring-ring/50 relative flex rounded-md border shadow-xs has-focus:ring-[3px]", className)))}>`);
			{
				function child($$renderer, { props, monthItems, selectedMonthItem }) {
					$$renderer.select({
						...props,
						value,
						onchange
					}, ($$renderer) => {
						$$renderer.push(`<!--[-->`);
						const each_array = ensure_array_like(monthItems);
						for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
							let monthItem = each_array[$$index];
							$$renderer.option({
								value: monthItem.value,
								selected: value !== void 0 ? monthItem.value === value : monthItem.value === selectedMonthItem.value
							}, ($$renderer) => {
								$$renderer.push(`${escape_html(monthItem.label)}`);
							});
						}
						$$renderer.push(`<!--]-->`);
					});
					$$renderer.push(` <span class="[&amp;>svg]:text-muted-foreground flex h-(--cell-size) items-center gap-1 rounded-md ps-2 pe-1 text-sm font-medium select-none [&amp;>svg]:size-3.5" aria-hidden="true">${escape_html(monthItems.find((item) => item.value === value)?.label || selectedMonthItem.label)} `);
					Chevron_down($$renderer, { class: cn("size-4", className) });
					$$renderer.push(`<!----></span>`);
				}
				if (Calendar_month_select$1) {
					$$renderer.push("<!--[-->");
					Calendar_month_select$1($$renderer, spread_props([
						{ class: "bg-background dark:bg-popover dark:text-popover-foreground absolute inset-0 opacity-0" },
						restProps,
						{
							get ref() {
								return ref;
							},
							set ref($$value) {
								ref = $$value;
								$$settled = false;
							},
							child,
							$$slots: { child: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			$$renderer.push(`</span>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-year-select.svelte
function Calendar_year_select($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, value, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<span${attr_class(clsx$1(cn("has-focus:border-ring border-input has-focus:ring-ring/50 relative flex rounded-md border shadow-xs has-focus:ring-[3px]", className)))}>`);
			{
				function child($$renderer, { props, yearItems, selectedYearItem }) {
					$$renderer.select({
						...props,
						value
					}, ($$renderer) => {
						$$renderer.push(`<!--[-->`);
						const each_array = ensure_array_like(yearItems);
						for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
							let yearItem = each_array[$$index];
							$$renderer.option({
								value: yearItem.value,
								selected: value !== void 0 ? yearItem.value === value : yearItem.value === selectedYearItem.value
							}, ($$renderer) => {
								$$renderer.push(`${escape_html(yearItem.label)}`);
							});
						}
						$$renderer.push(`<!--]-->`);
					});
					$$renderer.push(` <span class="[&amp;>svg]:text-muted-foreground flex h-(--cell-size) items-center gap-1 rounded-md ps-2 pe-1 text-sm font-medium select-none [&amp;>svg]:size-3.5" aria-hidden="true">${escape_html(yearItems.find((item) => item.value === value)?.label || selectedYearItem.label)} `);
					Chevron_down($$renderer, { class: cn("size-4", className) });
					$$renderer.push(`<!----></span>`);
				}
				if (Calendar_year_select$1) {
					$$renderer.push("<!--[-->");
					Calendar_year_select$1($$renderer, spread_props([
						{ class: "dark:bg-popover dark:text-popover-foreground absolute inset-0 opacity-0" },
						restProps,
						{
							get ref() {
								return ref;
							},
							set ref($$value) {
								ref = $$value;
								$$settled = false;
							},
							child,
							$$slots: { child: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			$$renderer.push(`</span>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-month.svelte
function Calendar_month($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			...restProps,
			class: clsx$1(cn("flex w-full flex-col gap-4", className))
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-nav.svelte
function Calendar_nav($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<nav${attributes({
			...restProps,
			class: clsx$1(cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", className))
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></nav>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/calendar/calendar-caption.svelte
function Calendar_caption($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { captionLayout, months, monthFormat, years, yearFormat, month, locale, placeholder = void 0, monthIndex = 0 } = $$props;
		function formatYear(date) {
			const dateObj = date.toDate($ad063034c8620db8$export$aa8b41735afcabd2());
			if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
			return new $12a3c853105e5a70$export$ad991b66133851cf(locale, { year: yearFormat }).format(dateObj);
		}
		function formatMonth(date) {
			const dateObj = date.toDate($ad063034c8620db8$export$aa8b41735afcabd2());
			if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
			return new $12a3c853105e5a70$export$ad991b66133851cf(locale, { month: monthFormat }).format(dateObj);
		}
		function MonthSelect($$renderer) {
			Calendar_month_select($$renderer, {
				months,
				monthFormat,
				value: month.month,
				onchange: (e) => {
					if (!placeholder) return;
					const v = Number.parseInt(e.currentTarget.value);
					placeholder = placeholder.set({ month: v }).subtract({ months: monthIndex });
				}
			});
		}
		function YearSelect($$renderer) {
			Calendar_year_select($$renderer, {
				years,
				yearFormat,
				value: month.year
			});
		}
		if (captionLayout === "dropdown") {
			$$renderer.push("<!--[0-->");
			MonthSelect($$renderer);
			$$renderer.push(`<!----> `);
			YearSelect($$renderer);
			$$renderer.push(`<!---->`);
		} else if (captionLayout === "dropdown-months") {
			$$renderer.push("<!--[1-->");
			MonthSelect($$renderer);
			$$renderer.push(`<!----> `);
			if (placeholder) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${escape_html(formatYear(placeholder))}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		} else if (captionLayout === "dropdown-years") {
			$$renderer.push("<!--[2-->");
			if (placeholder) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`${escape_html(formatMonth(placeholder))}`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			YearSelect($$renderer);
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(formatMonth(month))} ${escape_html(formatYear(month))}`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { placeholder });
	});
}
//#endregion
//#region src/lib/formComponents/DatePicker2.svelte
function DatePicker2($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data = void 0, oldDays = false, year = false, futureDays = false } = $$props;
		const todayDate = derived(() => oldDays ? void 0 : $ad063034c8620db8$export$d0bdf45af03a6ea3($ad063034c8620db8$export$aa8b41735afcabd2()));
		let form = $58246871e4652552$export$6b862160d295c8e(data || todayDate()?.toString() || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
		const formatEthiopianDate = (date) => {
			if (!date) return "";
			return new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric"
			}).format(date.toDate($ad063034c8620db8$export$aa8b41735afcabd2()));
		};
		const displayDate = derived(() => form ? formatEthiopianDate(form) : formatEthiopianDate(todayDate()));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Popover) {
				$$renderer.push("<!--[-->");
				Popover($$renderer, {
					children: ($$renderer) => {
						if (Popover_trigger) {
							$$renderer.push("<!--[-->");
							Popover_trigger($$renderer, {
								class: cn(buttonVariants({
									variant: "outline",
									class: "justify-between "
								}), !form && "text-muted-foreground"),
								children: ($$renderer) => {
									$$renderer.push(`<div class="flex items-center gap-2">`);
									Calendar$1($$renderer, {});
									$$renderer.push(`<!----> ${escape_html(displayDate())}</div>`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Popover_content) {
							$$renderer.push("<!--[-->");
							Popover_content($$renderer, {
								class: "flex flex-wrap gap-2 border-t p-0 px-2 py-4!",
								children: ($$renderer) => {
									$$renderer.push(`<div class="text-sm text-muted-foreground">Ethiopian Date: <span class="font-semibold text-foreground">${escape_html(displayDate())}</span></div> `);
									Calendar_1($$renderer, {
										type: "single",
										captionLayout: year ? "dropdown-years" : "label",
										minValue: todayDate(),
										maxValue: futureDays ? $ad063034c8620db8$export$d0bdf45af03a6ea3($ad063034c8620db8$export$aa8b41735afcabd2()) : void 0,
										get value() {
											return form;
										},
										set value($$value) {
											form = $$value;
											$$settled = false;
										}
									});
									$$renderer.push(`<!----> <!--[-->`);
									const each_array = ensure_array_like([
										{
											label: "Today",
											value: 0
										},
										{
											label: "Tomorrow",
											value: 1
										},
										{
											label: "In 3 days",
											value: 3
										},
										{
											label: "In a week",
											value: 7
										},
										{
											label: "In 2 weeks",
											value: 14
										}
									]);
									for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
										let preset = each_array[$$index];
										Button($$renderer, {
											variant: "outline",
											size: "sm",
											class: "flex-1",
											onclick: () => {
												form = $ad063034c8620db8$export$d0bdf45af03a6ea3($ad063034c8620db8$export$aa8b41735afcabd2()).add({ days: preset.value });
											},
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(preset.label)}`);
											},
											$$slots: { default: true }
										});
									}
									$$renderer.push(`<!--]-->`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { data });
	});
}
//#endregion
//#region src/lib/formComponents/DatePicker.svelte
function DatePicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data = "", oldDays = false, year = false, futureDays = false } = $$props;
		const tz = $ad063034c8620db8$export$aa8b41735afcabd2();
		const minDate = derived(() => oldDays ? void 0 : $ad063034c8620db8$export$d0bdf45af03a6ea3(tz));
		const maxDate = derived(() => futureDays ? $ad063034c8620db8$export$d0bdf45af03a6ea3(tz) : void 0);
		let selectedDates = data ? data.split(",").map((d) => $58246871e4652552$export$6b862160d295c8e(d.trim())) : [];
		const formatEthiopianDate = (date) => {
			return new Intl.DateTimeFormat("am-ET", {
				year: "numeric",
				month: "short",
				day: "numeric",
				calendar: "ethiopic"
			}).format(date.toDate(tz));
		};
		const displayLabel = derived(() => {
			if (selectedDates.length === 0) return "Select dates";
			if (selectedDates.length === 1) return formatEthiopianDate(selectedDates[0]);
			return `${selectedDates.length} dates selected`;
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Popover) {
				$$renderer.push("<!--[-->");
				Popover($$renderer, {
					children: ($$renderer) => {
						if (Popover_trigger) {
							$$renderer.push("<!--[-->");
							Popover_trigger($$renderer, {
								class: cn(buttonVariants({
									variant: "outline",
									class: "w-full justify-start text-left font-normal"
								}), selectedDates.length === 0 && "text-muted-foreground"),
								children: ($$renderer) => {
									Calendar$1($$renderer, { class: "mr-2 h-4 w-4" });
									$$renderer.push(`<!----> ${escape_html(displayLabel())}`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Popover_content) {
							$$renderer.push("<!--[-->");
							Popover_content($$renderer, {
								class: "flex w-auto flex-col gap-2 p-4",
								children: ($$renderer) => {
									Scroll_area($$renderer, {
										class: "h-80",
										children: ($$renderer) => {
											$$renderer.push(`<div class="flex flex-col text-sm text-muted-foreground">`);
											if (selectedDates.length > 0) {
												$$renderer.push("<!--[0-->");
												Scroll_area($$renderer, {
													class: "m-2 max-h-24",
													children: ($$renderer) => {
														$$renderer.push(`<ul class="flex max-h-24 max-w-72 flex-row flex-wrap gap-2 rounded-lg border"><!--[-->`);
														const each_array = ensure_array_like(selectedDates);
														for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
															let date = each_array[$$index];
															$$renderer.push(`<li class="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">${escape_html(formatEthiopianDate(date))}</li>`);
														}
														$$renderer.push(`<!--]--></ul>`);
													},
													$$slots: { default: true }
												});
											} else {
												$$renderer.push("<!--[-1-->");
												$$renderer.push(`No dates selected`);
											}
											$$renderer.push(`<!--]--></div> <div class="mt-4 grid grid-cols-2 gap-2">`);
											Button($$renderer, {
												variant: "secondary",
												size: "sm",
												onclick: () => selectedDates = [$ad063034c8620db8$export$d0bdf45af03a6ea3(tz)],
												children: ($$renderer) => {
													$$renderer.push(`<!---->Today Only`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----> `);
											Button($$renderer, {
												variant: "ghost",
												size: "sm",
												onclick: () => selectedDates = [],
												children: ($$renderer) => {
													$$renderer.push(`<!---->Clear All`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></div> `);
											Scroll_area($$renderer, {
												children: ($$renderer) => {
													Calendar_1($$renderer, {
														locale: "am-ET",
														type: "multiple",
														captionLayout: year ? "dropdown-years" : "label",
														minValue: minDate(),
														maxValue: maxDate(),
														class: "h-72",
														get value() {
															return selectedDates;
														},
														set value($$value) {
															selectedDates = $$value;
															$$settled = false;
														}
													});
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!---->`);
										},
										$$slots: { default: true }
									});
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { data });
	});
}
//#endregion
//#region src/lib/formComponents/ComboboxComp.svelte
function ComboboxComp($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items, name, value = void 0, required = false } = $$props;
		let open = false;
		let triggerRef = null;
		const triggerContent = derived(() => items.find((f) => String(f.value) === String(value))?.name ?? "Select " + name.replace(/([a-z])([A-Z])/g, "$1 $2"));
		function closeAndFocusTrigger() {
			open = false;
			(/* @__PURE__ */ tick()).then(() => {
				triggerRef.focus();
			});
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Popover) {
				$$renderer.push("<!--[-->");
				Popover($$renderer, {
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						{
							function child($$renderer, { props }) {
								Button($$renderer, spread_props([props, {
									variant: "outline",
									class: "w-full justify-between capitalize",
									role: "combobox",
									"aria-expanded": open,
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(triggerContent())} `);
										Chevrons_up_down($$renderer, { class: "opacity-50" });
										$$renderer.push(`<!---->`);
									},
									$$slots: { default: true }
								}]));
							}
							if (Popover_trigger) {
								$$renderer.push("<!--[-->");
								Popover_trigger($$renderer, {
									get ref() {
										return triggerRef;
									},
									set ref($$value) {
										triggerRef = $$value;
										$$settled = false;
									},
									child,
									$$slots: { child: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						}
						$$renderer.push(` <input type="hidden"${attr("value", value)}${attr("name", name)}${attr("required", required, true)}/> `);
						if (Popover_content) {
							$$renderer.push("<!--[-->");
							Popover_content($$renderer, {
								class: "w-full p-0",
								children: ($$renderer) => {
									if (Command) {
										$$renderer.push("<!--[-->");
										Command($$renderer, {
											children: ($$renderer) => {
												if (Command_input) {
													$$renderer.push("<!--[-->");
													Command_input($$renderer, { placeholder: `Search ${stringify$1(name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/\b\w/g, (char) => char.toUpperCase()))}...` });
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Command_list) {
													$$renderer.push("<!--[-->");
													Command_list($$renderer, {
														children: ($$renderer) => {
															if (Command_empty) {
																$$renderer.push("<!--[-->");
																Command_empty($$renderer, {
																	children: ($$renderer) => {
																		$$renderer.push(`<!---->No ${escape_html(name.replace(/([a-z])([A-Z])/g, "$1 $2"))} found.`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
															$$renderer.push(` `);
															if (Command_group) {
																$$renderer.push("<!--[-->");
																Command_group($$renderer, {
																	children: ($$renderer) => {
																		$$renderer.push(`<!--[-->`);
																		const each_array = ensure_array_like(items);
																		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
																			let item = each_array[$$index];
																			if (Command_item) {
																				$$renderer.push("<!--[-->");
																				Command_item($$renderer, {
																					value: item.name,
																					keywords: [item.name],
																					onSelect: () => {
																						value = item.value;
																						closeAndFocusTrigger();
																					},
																					class: selectItem,
																					children: ($$renderer) => {
																						Check($$renderer, { class: cn(value !== item.value && "text-transparent") });
																						$$renderer.push(`<!----> ${escape_html(item.name)}`);
																					},
																					$$slots: { default: true }
																				});
																				$$renderer.push("<!--]-->");
																			} else {
																				$$renderer.push("<!--[!-->");
																				$$renderer.push("<!--]-->");
																			}
																		}
																		$$renderer.push(`<!--]-->`);
																	},
																	$$slots: { default: true }
																});
																$$renderer.push("<!--]-->");
															} else {
																$$renderer.push("<!--[!-->");
																$$renderer.push("<!--]-->");
															}
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { value });
	});
}
//#endregion
//#region src/lib/components/ui/checkbox/checkbox.svelte
function Checkbox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, checked = false, indeterminate = false, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			{
				function children($$renderer, { checked, indeterminate }) {
					$$renderer.push(`<div data-slot="checkbox-indicator" class="[&amp;>svg]:size-3.5 grid place-content-center text-current transition-none">`);
					if (checked) {
						$$renderer.push("<!--[0-->");
						Check($$renderer, {});
					} else if (indeterminate) {
						$$renderer.push("<!--[1-->");
						Minus($$renderer, {});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div>`);
				}
				if (Checkbox$1) {
					$$renderer.push("<!--[-->");
					Checkbox$1($$renderer, spread_props([
						{
							"data-slot": "checkbox",
							class: cn("border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50", className)
						},
						restProps,
						{
							get ref() {
								return ref;
							},
							set ref($$value) {
								ref = $$value;
								$$settled = false;
							},
							get checked() {
								return checked;
							},
							set checked($$value) {
								checked = $$value;
								$$settled = false;
							},
							get indeterminate() {
								return indeterminate;
							},
							set indeterminate($$value) {
								indeterminate = $$value;
								$$settled = false;
							},
							children,
							$$slots: { default: true }
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			checked,
			indeterminate
		});
	});
}
//#endregion
//#region src/lib/formComponents/CheckboxComp.svelte
function CheckboxComp($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items = [], checkedValues = [] } = $$props;
		/**
		* Handle checkbox change
		*/
		const handleChange = (itemValue, isChecked) => {
			if (isChecked) checkedValues = [...checkedValues, itemValue];
			else checkedValues = checkedValues.filter((v) => v !== itemValue);
		};
		let Icon = derived(() => checkedValues.length === items.length ? Badge_check : Badge);
		function toggleSelectAll() {
			if (checkedValues.length === items.length) checkedValues = [];
			else checkedValues = items.map((item) => String(item.value));
		}
		Button($$renderer, {
			onclick: toggleSelectAll,
			size: "icon",
			class: "w-full lg:w-1/5",
			children: ($$renderer) => {
				if (Icon()) {
					$$renderer.push("<!--[-->");
					Icon()($$renderer, {});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(` ${escape_html(checkedValues.length === items.length ? "Unselect" : "Select")} All`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----> <div${attr_class(`grid ${items.length > 20 ? "grid-cols-1 lg:grid-cols-5" : items.length > 10 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-3`)}><!--[-->`);
		const each_array = ensure_array_like(items);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let item = each_array[$$index];
			$$renderer.push(`<div class="flex items-center gap-2">`);
			Label($$renderer, {
				for: String(item.value),
				class: "cursor-pointer font-normal",
				children: ($$renderer) => {
					Checkbox($$renderer, {
						id: String(item.value),
						checked: checkedValues.includes(String(item.value)),
						onCheckedChange: (c) => handleChange(String(item.value), c)
					});
					$$renderer.push(`<!----> ${escape_html(item.name)}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { checkedValues });
	});
}
//#endregion
//#region src/lib/formComponents/GalleryUpload.svelte
function GalleryUpload($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { form, name, title = "Gallery Upload", placeholder = "Images or PDFs (Max 1MB per image)", images = [] } = $$props;
		let file = filesProxy(form, name);
		let isDragging = false;
		let isProcessing = false;
		async function handleFileSelection(newFiles) {
			if (!newFiles || newFiles.length === 0) return;
			isProcessing = true;
			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
				initialQuality: .8
			};
			try {
				const processed = await Promise.all(Array.from(newFiles).map(async (f) => {
					if (f.type === "application/pdf" || !f.type.startsWith("image/")) return f;
					try {
						const compressed = await imageCompression(f, options);
						return new File([compressed], f.name, { type: compressed.type });
					} catch (err) {
						console.error("Compression error:", err);
						return f;
					}
				}));
				const currentFiles = Array.from(store_get($$store_subs ??= {}, "$file", file) ?? []);
				const dt = new DataTransfer();
				[...currentFiles, ...processed].forEach((f) => dt.items.add(f));
				store_set(file, Array.from(dt.files));
				toast.success(`${processed.length} file(s) added and optimized`);
			} catch (err) {
				console.error("Selection Error:", err);
				toast.error("Failed to process files");
			} finally {
				isProcessing = false;
			}
		}
		function removeNewFile(index) {
			const current = Array.from(store_get($$store_subs ??= {}, "$file", file));
			current.splice(index, 1);
			store_set(file, current);
		}
		function removeExistingImage(index) {
			images = images.filter((_, i) => i !== index);
		}
		$$renderer.push(`<div class="flex w-full flex-col gap-6"><div class="flex flex-col gap-2">`);
		Label($$renderer, {
			for: name,
			class: `group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 transition-all
			${isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted"}`,
			ondragover: (e) => {
				e.preventDefault();
				isDragging = true;
			},
			ondragleave: () => isDragging = false,
			ondrop: (e) => {
				e.preventDefault();
				isDragging = false;
				handleFileSelection(e.dataTransfer?.files);
			},
			children: ($$renderer) => {
				$$renderer.push(`<div class="flex flex-col items-center justify-center gap-3 text-center"><div class="rounded-full bg-background p-4 shadow-sm transition-transform group-hover:scale-110">`);
				if (isProcessing) {
					$$renderer.push("<!--[0-->");
					Loader($$renderer, { class: "h-6 w-6 animate-spin text-primary" });
				} else {
					$$renderer.push("<!--[-1-->");
					Cloud_upload($$renderer, { class: `h-6 w-6 ${isDragging ? "text-primary" : "text-muted-foreground"}` });
				}
				$$renderer.push(`<!--]--></div> <div class="px-4"><p class="text-sm font-medium">${escape_html(isProcessing ? "Optimizing assets..." : isDragging ? "Drop them now!" : "Click to upload or drag gallery")}</p> <p class="text-xs text-muted-foreground">${escape_html(placeholder)}</p></div></div> `);
				Input($$renderer, {
					id: name,
					type: "file",
					class: "hidden",
					name,
					accept: "image/*,application/pdf",
					multiple: true,
					onchange: (e) => handleFileSelection(e.currentTarget.files)
				});
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div> `);
		if (store_get($$store_subs ??= {}, "$file", file).length > 0 || images.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="space-y-4"><div class="flex items-center justify-between"><h3 class="text-sm font-semibold tracking-tight">Gallery Preview</h3> `);
			if (store_get($$store_subs ??= {}, "$file", file).length > 0) {
				$$renderer.push("<!--[0-->");
				Button($$renderer, {
					variant: "ghost",
					size: "sm",
					class: "h-8 text-xs text-muted-foreground hover:text-destructive",
					onclick: () => store_set(file, []),
					children: ($$renderer) => {
						Brush_cleaning($$renderer, { class: "mr-2 h-3.5 w-3.5" });
						$$renderer.push(`<!----> Clear New`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"><!--[-->`);
			const each_array = ensure_array_like(images);
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let img = each_array[i];
				$$renderer.push(`<div class="group relative aspect-square overflow-hidden rounded-lg border bg-muted"><img${attr("src", `/files/${stringify$1(img)}`)} class="h-full w-full object-cover" alt="Server asset"/> <div class="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">`);
				Button($$renderer, {
					variant: "destructive",
					size: "icon",
					class: "absolute top-1 right-1 h-7 w-7 rounded-full",
					onclick: () => removeExistingImage(i),
					children: ($$renderer) => {
						X($$renderer, { class: "h-4 w-4" });
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <div class="absolute right-0 bottom-0 left-0 bg-background/80 p-1 text-center"><span class="text-[10px] font-medium text-muted-foreground uppercase">Existing</span></div></div>`);
			}
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$file", file));
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let f = each_array_1[i];
				$$renderer.push(`<div class="group relative aspect-square overflow-hidden rounded-lg border bg-card shadow-sm">`);
				if (f.type.startsWith("image/")) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${attr("src", URL.createObjectURL(f))} class="h-full w-full object-cover" alt="Local preview"/>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="flex h-full flex-col items-center justify-center gap-2 bg-muted/50">`);
					File_text($$renderer, { class: "h-8 w-8 text-muted-foreground" });
					$$renderer.push(`<!----> <span class="max-w-full truncate px-2 text-[10px]">${escape_html(f.name)}</span></div>`);
				}
				$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">`);
				Button($$renderer, {
					variant: "destructive",
					size: "icon",
					class: "absolute top-1 right-1 h-7 w-7 rounded-full",
					onclick: () => removeNewFile(i),
					children: ($$renderer) => {
						X($$renderer, { class: "h-4 w-4" });
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div> <div class="absolute right-0 bottom-0 left-0 bg-primary/90 p-1 text-center text-white"><span class="text-[10px] font-bold">${escape_html((f.size / 1024).toFixed(0))} KB</span></div></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { images });
	});
}
//#endregion
//#region src/lib/formComponents/InputComp.svelte
function InputComp($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { label, form, name, errors, type, required = false, max = "", min = "", placeholder = "", rows = 5, items = [], oldDays = true, year = false, futureDays = false, image = "", disabled = false, images = void 0 } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div class="flex w-full max-w-full flex-col justify-start gap-2 p-1">`);
			Label($$renderer, {
				for: name,
				class: "capitalize",
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(label)}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			if (type === "textarea") {
				$$renderer.push("<!--[0-->");
				Textarea($$renderer, {
					name,
					required,
					rows,
					placeholder,
					get value() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set value($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
			} else if (type === "file") {
				$$renderer.push("<!--[1-->");
				FileUpload($$renderer, {
					name,
					form,
					image,
					placeholder
				});
			} else if (type === "gallery") {
				$$renderer.push("<!--[2-->");
				GalleryUpload($$renderer, {
					name,
					form,
					errors,
					title: placeholder,
					get images() {
						return images;
					},
					set images($$value) {
						images = $$value;
						$$settled = false;
					}
				});
			} else if (type === "select") {
				$$renderer.push("<!--[3-->");
				SelectComp($$renderer, {
					name,
					items,
					get value() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set value($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
			} else if (type === "date") {
				$$renderer.push("<!--[4-->");
				DatePicker2($$renderer, {
					oldDays,
					year,
					futureDays,
					get data() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set data($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <input type="hidden"${attr("name", name)}${attr("value", store_get($$store_subs ??= {}, "$form", form)[name])}/>`);
			} else if (type === "dateMultiple") {
				$$renderer.push("<!--[5-->");
				DatePicker($$renderer, {
					oldDays,
					year,
					futureDays,
					get data() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set data($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <input type="hidden"${attr("name", name)}${attr("value", store_get($$store_subs ??= {}, "$form", form)[name])}/>`);
			} else if (type === "combo") {
				$$renderer.push("<!--[6-->");
				ComboboxComp($$renderer, {
					name,
					items,
					required,
					get value() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set value($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
			} else if (type === "checkbox") {
				$$renderer.push("<!--[7-->");
				CheckboxComp($$renderer, {
					items,
					get checkedValues() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set checkedValues($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> <input type="hidden"${attr("name", name)}${attr("value", store_get($$store_subs ??= {}, "$form", form)[name])}/>`);
			} else if (type === "checkboxSingle") {
				$$renderer.push("<!--[8-->");
				$$renderer.push(`<div class="flex items-center gap-2">`);
				Checkbox($$renderer, {
					get checked() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set checked($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
				$$renderer.push(`<!----> `);
				Label($$renderer, {
					for: name,
					class: "capitalize",
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(placeholder)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <input type="hidden"${attr("name", name)}${attr("value", store_get($$store_subs ??= {}, "$form", form)[name])}/></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				Input($$renderer, {
					type,
					disabled,
					name,
					step: "any",
					max,
					min,
					placeholder,
					required,
					get value() {
						return store_get($$store_subs ??= {}, "$form", form)[name];
					},
					set value($$value) {
						store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
						$$settled = false;
					}
				});
			}
			$$renderer.push(`<!--]--> `);
			if (store_get($$store_subs ??= {}, "$errors", errors)[name]) {
				$$renderer.push("<!--[0-->");
				if (store_get($$store_subs ??= {}, "$errors", errors)[name]._errors) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<!--[-->`);
					const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$errors", errors)[name]._errors);
					for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
						let error = each_array[$$index];
						$$renderer.push(`<p class="flex items-center gap-2 text-red-500">`);
						Circle_alert($$renderer, {});
						$$renderer.push(`<!----> ${escape_html(error)}</p>`);
					}
					$$renderer.push(`<!--]-->`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<p class="text-red-500">${escape_html(store_get($$store_subs ??= {}, "$errors", errors)[name])}</p>`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { images });
	});
}

export { InputComp as I };
//# sourceMappingURL=InputComp.js-DjIGM0dz.js.map
