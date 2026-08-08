import { a9 as escape_html, a4 as ensure_array_like, aa as attr_class, T as derived } from '../../../chunks/server.js-CPNQ0GBv.js';
import { h as getLocale } from '../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../chunks/shared.js-CgqsOrws.js';

//#region src/lib/paraglide/messages/faq_hero_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Hero_EyebrowInputs */
var en_faq_hero_eyebrow = () => {
	return `FAQ`;
};
var am_faq_hero_eyebrow = () => {
	return `ተደጋግመው የሚነሱ ጥያቄዎች`;
};
/**
* | output |
* | --- |
* | "FAQ" |
*
* @param {Faq_Hero_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_hero_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_hero_eyebrow();
	return en_faq_hero_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/faq_hero_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Hero_TitleInputs */
var en_faq_hero_title = () => {
	return `Common questions.`;
};
var am_faq_hero_title = () => {
	return `የተለመዱ ጥያቄዎች።`;
};
/**
* | output |
* | --- |
* | "Common questions." |
*
* @param {Faq_Hero_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_hero_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_hero_title();
	return en_faq_hero_title();
});
//#endregion
//#region src/lib/paraglide/messages/faq_hero_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Hero_SubtitleInputs */
var en_faq_hero_subtitle = () => {
	return `Everything you need to know before subscribing — and after.`;
};
var am_faq_hero_subtitle = () => {
	return `ከመመዝገብዎ በፊት እና በኋላ ማወቅ ያለብዎት ሁሉም ነገር።`;
};
/**
* | output |
* | --- |
* | "Everything you need to know before subscribing — and after." |
*
* @param {Faq_Hero_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_hero_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_hero_subtitle();
	return en_faq_hero_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cta_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cta_EyebrowInputs */
var en_faq_cta_eyebrow = () => {
	return `Still have questions?`;
};
var am_faq_cta_eyebrow = () => {
	return `አሁንም ጥያቄ አለዎት?`;
};
/**
* | output |
* | --- |
* | "Still have questions?" |
*
* @param {Faq_Cta_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cta_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cta_eyebrow();
	return en_faq_cta_eyebrow();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cta_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cta_TitleInputs */
var en_faq_cta_title = () => {
	return `Ready when you are.`;
};
var am_faq_cta_title = () => {
	return `ዝግጁ ስንሆን ይቀላቀሉን።`;
};
/**
* | output |
* | --- |
* | "Ready when you are." |
*
* @param {Faq_Cta_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cta_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cta_title();
	return en_faq_cta_title();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cta_subtitle.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cta_SubtitleInputs */
var en_faq_cta_subtitle = () => {
	return `No minimum term. Cancel any time. Start with one pack if you're not sure.`;
};
var am_faq_cta_subtitle = () => {
	return `ምንም ዝቅተኛ የቆይታ ጊዜ የለም። በማንኛውም ጊዜ ይሰርዙ። እርግጠኛ ካልሆኑ በአንድ ጥቅል ይጀምሩ።`;
};
/**
* | output |
* | --- |
* | "No minimum term. Cancel any time. Start with one pack if you're not sure." |
*
* @param {Faq_Cta_SubtitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cta_subtitle = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cta_subtitle();
	return en_faq_cta_subtitle();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cta_button.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cta_ButtonInputs */
var en_faq_cta_button = () => {
	return `Choose Your Plan`;
};
var am_faq_cta_button = () => {
	return `እቅድዎን ይምረጡ`;
};
/**
* | output |
* | --- |
* | "Choose Your Plan" |
*
* @param {Faq_Cta_ButtonInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cta_button = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cta_button();
	return en_faq_cta_button();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cta_contact_prefix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cta_Contact_PrefixInputs */
var en_faq_cta_contact_prefix = () => {
	return `Or email us at`;
};
var am_faq_cta_contact_prefix = () => {
	return `ወይም በኢሜይል ያግኙን`;
};
/**
* | output |
* | --- |
* | "Or email us at" |
*
* @param {Faq_Cta_Contact_PrefixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cta_contact_prefix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cta_contact_prefix();
	return en_faq_cta_contact_prefix();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cta_contact_suffix.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cta_Contact_SuffixInputs */
var en_faq_cta_contact_suffix = () => {
	return `— we respond within one working day.`;
};
var am_faq_cta_contact_suffix = () => {
	return `— በአንድ የስራ ቀን ውስጥ እንመልስልዎታለን።`;
};
/**
* | output |
* | --- |
* | "— we respond within one working day." |
*
* @param {Faq_Cta_Contact_SuffixInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cta_contact_suffix = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cta_contact_suffix();
	return en_faq_cta_contact_suffix();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cat_product.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cat_ProductInputs */
var en_faq_cat_product = () => {
	return `The product`;
};
var am_faq_cat_product = () => {
	return `ምርቱ`;
};
/**
* | output |
* | --- |
* | "The product" |
*
* @param {Faq_Cat_ProductInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cat_product = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cat_product();
	return en_faq_cat_product();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cat_subscription.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cat_SubscriptionInputs */
var en_faq_cat_subscription = () => {
	return `Subscription`;
};
var am_faq_cat_subscription = () => {
	return `ደንበኝነት ምዝገባ`;
};
/**
* | output |
* | --- |
* | "Subscription" |
*
* @param {Faq_Cat_SubscriptionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cat_subscription = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cat_subscription();
	return en_faq_cat_subscription();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cat_delivery.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cat_DeliveryInputs */
var en_faq_cat_delivery = () => {
	return `Delivery`;
};
var am_faq_cat_delivery = () => {
	return `አቅርቦት`;
};
/**
* | output |
* | --- |
* | "Delivery" |
*
* @param {Faq_Cat_DeliveryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cat_delivery = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cat_delivery();
	return en_faq_cat_delivery();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cat_gifting.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cat_GiftingInputs */
var en_faq_cat_gifting = () => {
	return `Gifting`;
};
var am_faq_cat_gifting = () => {
	return `ስጦታ`;
};
/**
* | output |
* | --- |
* | "Gifting" |
*
* @param {Faq_Cat_GiftingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cat_gifting = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cat_gifting();
	return en_faq_cat_gifting();
});
//#endregion
//#region src/lib/paraglide/messages/faq_cat_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Cat_AccountInputs */
var en_faq_cat_account = () => {
	return `Account`;
};
var am_faq_cat_account = () => {
	return `መለያ`;
};
/**
* | output |
* | --- |
* | "Account" |
*
* @param {Faq_Cat_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_cat_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_cat_account();
	return en_faq_cat_account();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q1_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q1_QuestionInputs */
var en_faq_product_q1_question = () => {
	return `What is injera?`;
};
var am_faq_product_q1_question = () => {
	return `እንጀራ ምንድን ነው?`;
};
/**
* | output |
* | --- |
* | "What is injera?" |
*
* @param {Faq_Product_Q1_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q1_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q1_question();
	return en_faq_product_q1_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q1_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q1_AnswerInputs */
var en_faq_product_q1_answer = () => {
	return `Injera is a naturally fermented Ethiopian flatbread made from teff — a small, nutrient-dense grain native to the Horn of Africa. It has a distinctive spongy texture and a mild, slightly sour flavour from the fermentation process. It is the foundation of Ethiopian and Eritrean cuisine, used both as a plate and as a utensil.`;
};
var am_faq_product_q1_answer = () => {
	return `እንጀራ ከቀንድ አፍሪካ ተወላጅ ከሆነው ንጥረ ነገር የበለጸገ እህል ከሆነው ጤፍ የሚዘጋጅ በተፈጥሮ የተቦካ የኢትዮጵያ ጠፍጣፋ ዳቦ ነው። ልዩ የሆነ ስፖንጅ መሰል ሸካራነት እና ከመፍላት ሂደት የሚገኝ ለስላሳ ትንሽ ጎምዛዛ ጣዕም አለው። የኢትዮጵያ እና የኤርትራ ምግብ መሰረት ሲሆን በሳህንነትም ሆነ በማንኪያነት ያገለግላል።`;
};
/**
* | output |
* | --- |
* | "Injera is a naturally fermented Ethiopian flatbread made from teff — a small, nutrient-dense grain native to the Horn of Africa. It has a distinctive spongy ..." |
*
* @param {Faq_Product_Q1_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q1_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q1_answer();
	return en_faq_product_q1_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q2_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q2_QuestionInputs */
var en_faq_product_q2_question = () => {
	return `Where is GOTERA injera made?`;
};
var am_faq_product_q2_question = () => {
	return `የGOTERA እንጀራ የት ነው የሚመረተው?`;
};
/**
* | output |
* | --- |
* | "Where is GOTERA injera made?" |
*
* @param {Faq_Product_Q2_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q2_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q2_question();
	return en_faq_product_q2_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q2_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q2_AnswerInputs */
var en_faq_product_q2_answer = () => {
	return `Made and packed in Ethiopia. We keep the product at its source — that is what makes it real.`;
};
var am_faq_product_q2_answer = () => {
	return `በኢትዮጵያ ውስጥ ተመርቶ ይታሸጋል። ምርቱን ካለበት ምንጭ ጋር እናቆያለን — ይህ ነው እውነተኛ የሚያደርገው።`;
};
/**
* | output |
* | --- |
* | "Made and packed in Ethiopia. We keep the product at its source — that is what makes it real." |
*
* @param {Faq_Product_Q2_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q2_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q2_answer();
	return en_faq_product_q2_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q3_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q3_QuestionInputs */
var en_faq_product_q3_question = () => {
	return `Is GOTERA injera gluten-free?`;
};
var am_faq_product_q3_question = () => {
	return `የGOTERA እንጀራ ግሉተን-ነጻ ነው?`;
};
/**
* | output |
* | --- |
* | "Is GOTERA injera gluten-free?" |
*
* @param {Faq_Product_Q3_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q3_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q3_question();
	return en_faq_product_q3_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q3_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q3_AnswerInputs */
var en_faq_product_q3_answer = () => {
	return `Yes. GOTERA injera is made from 100% teff, which is naturally gluten-free. It is also vegan and high in iron. If you have a severe gluten intolerance or coeliac disease, please check the packaging for full allergen information once you receive your order.`;
};
var am_faq_product_q3_answer = () => {
	return `አዎ። የGOTERA እንጀራ በ100% ጤፍ የተሰራ ሲሆን ጤፍ በተፈጥሮው ግሉተን-ነጻ ነው። እንዲሁም ቪጋን እና በብረት የበለጸገ ነው። ከባድ የግሉተን አለመቻቻል ወይም ሴሊያክ በሽታ ካለብዎት፣ እባክዎ ትዕዛዝዎን ከተቀበሉ በኋላ ሙሉ የአለርጂ መረጃ ለማግኘት ማሸጊያውን ይመልከቱ።`;
};
/**
* | output |
* | --- |
* | "Yes. GOTERA injera is made from 100% teff, which is naturally gluten-free. It is also vegan and high in iron. If you have a severe gluten intolerance or coel..." |
*
* @param {Faq_Product_Q3_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q3_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q3_answer();
	return en_faq_product_q3_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q4_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q4_QuestionInputs */
var en_faq_product_q4_question = () => {
	return `How fresh is the injera when it arrives?`;
};
var am_faq_product_q4_question = () => {
	return `እንጀራው ሲደርስ ምን ያህል ትኩስ ነው?`;
};
/**
* | output |
* | --- |
* | "How fresh is the injera when it arrives?" |
*
* @param {Faq_Product_Q4_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q4_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q4_question();
	return en_faq_product_q4_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q4_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q4_AnswerInputs */
var en_faq_product_q4_answer = () => {
	return `Each order is packed on dispatch day and shipped in insulated cold-chain packaging. It arrives at the correct temperature and carries a best-before date on the pack. You should consume it before that date.`;
};
var am_faq_product_q4_answer = () => {
	return `እያንዳንዱ ትዕዛዝ በመላኪያ ቀን ታሽጎ በሙቀት-ቁጥጥር ማሸጊያ ውስጥ ይላካል። በትክክለኛው ሙቀት ደረጃ ይደርስ ሲሆን በማሸጊያው ላይ የመጠቀሚያ ቀነ-ገደብ ተጽፎበታል። ከዚያ ቀን በፊት መጠቀም አለብዎት።`;
};
/**
* | output |
* | --- |
* | "Each order is packed on dispatch day and shipped in insulated cold-chain packaging. It arrives at the correct temperature and carries a best-before date on t..." |
*
* @param {Faq_Product_Q4_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q4_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q4_answer();
	return en_faq_product_q4_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q5_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q5_QuestionInputs */
var en_faq_product_q5_question = () => {
	return `Can I freeze injera?`;
};
var am_faq_product_q5_question = () => {
	return `እንጀራውን ማቀዝቀዝ እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "Can I freeze injera?" |
*
* @param {Faq_Product_Q5_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q5_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q5_question();
	return en_faq_product_q5_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q5_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q5_AnswerInputs */
var en_faq_product_q5_answer = () => {
	return `Yes. Injera freezes well. Separate individual pieces with baking paper before freezing, and defrost at room temperature. Full storage guidance is printed on the packaging.`;
};
var am_faq_product_q5_answer = () => {
	return `አዎ። እንጀራ በደንብ ይቀዘቅዛል። ከማቀዝቀዝዎ በፊት እያንዳንዱን ቁራጭ በዳቦ መጋገሪያ ወረቀት ይለያዩ፣ እና በክፍል ሙቀት ውስጥ ያቅልጡት። ሙሉ የማከማቻ መመሪያ በማሸጊያው ላይ ተጽፏል።`;
};
/**
* | output |
* | --- |
* | "Yes. Injera freezes well. Separate individual pieces with baking paper before freezing, and defrost at room temperature. Full storage guidance is printed on ..." |
*
* @param {Faq_Product_Q5_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q5_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q5_answer();
	return en_faq_product_q5_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q6_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q6_QuestionInputs */
var en_faq_product_q6_question = () => {
	return `What if I don't like it?`;
};
var am_faq_product_q6_question = () => {
	return `ካልወደድኩት ምን ይሆናል?`;
};
/**
* | output |
* | --- |
* | "What if I don't like it?" |
*
* @param {Faq_Product_Q6_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q6_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q6_question();
	return en_faq_product_q6_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_product_q6_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Product_Q6_AnswerInputs */
var en_faq_product_q6_answer = () => {
	return `If a product arrives damaged or is not what you ordered, contact us within 48 hours at hello@gotera.co.uk and we will sort it. Food products cannot be returned, but we will always make it right if something has gone wrong on our side.`;
};
var am_faq_product_q6_answer = () => {
	return `ምርቱ ተጎድቶ ከደረሰ ወይም ያዘዙት ካልሆነ በ48 ሰዓታት ውስጥ hello@gotera.co.uk ላይ ያግኙን እና እናስተካክለዋለን። የምግብ ምርቶች ሊመለሱ አይችሉም፣ ነገር ግን ከእኛ በኩል ስህተት ከተፈጠረ ሁልጊዜ እናስተካክለዋለን።`;
};
/**
* | output |
* | --- |
* | "If a product arrives damaged or is not what you ordered, contact us within 48 hours at hello@gotera.co.uk and we will sort it. Food products cannot be return..." |
*
* @param {Faq_Product_Q6_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_product_q6_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_product_q6_answer();
	return en_faq_product_q6_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q1_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q1_QuestionInputs */
var en_faq_subscription_q1_question = () => {
	return `How does the subscription work?`;
};
var am_faq_subscription_q1_question = () => {
	return `ደንበኝነት ምዝገባ እንዴት ይሰራል?`;
};
/**
* | output |
* | --- |
* | "How does the subscription work?" |
*
* @param {Faq_Subscription_Q1_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q1_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q1_question();
	return en_faq_subscription_q1_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q1_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q1_AnswerInputs */
var en_faq_subscription_q1_answer = () => {
	return `You choose a plan, we deliver injera once a month. Payment is taken automatically on the same date each month. You manage everything — pausing, skipping, changing plan, adding products — from your account.`;
};
var am_faq_subscription_q1_answer = () => {
	return `እቅድ ይምረጡ፣ በወር አንድ ጊዜ እንጀራ እናደርስልዎታለን። ክፍያ በየወሩ በተመሳሳይ ቀን በራስ-ሰር ይወሰዳል። ሁሉንም ነገር — ማቆም፣ መዝለል፣ እቅድ መቀየር፣ ምርቶች መጨመር — ከመለያዎ ያስተዳድራሉ።`;
};
/**
* | output |
* | --- |
* | "You choose a plan, we deliver injera once a month. Payment is taken automatically on the same date each month. You manage everything — pausing, skipping, cha..." |
*
* @param {Faq_Subscription_Q1_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q1_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q1_answer();
	return en_faq_subscription_q1_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q2_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q2_QuestionInputs */
var en_faq_subscription_q2_question = () => {
	return `Is there a minimum term?`;
};
var am_faq_subscription_q2_question = () => {
	return `ዝቅተኛ የቆይታ ጊዜ አለ?`;
};
/**
* | output |
* | --- |
* | "Is there a minimum term?" |
*
* @param {Faq_Subscription_Q2_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q2_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q2_question();
	return en_faq_subscription_q2_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q2_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q2_AnswerInputs */
var en_faq_subscription_q2_answer = () => {
	return `None. Cancel any time from your account. No cancellation fees.`;
};
var am_faq_subscription_q2_answer = () => {
	return `የለም። ከመለያዎ በማንኛውም ጊዜ ይሰርዙ። ምንም የስረዛ ክፍያ የለም።`;
};
/**
* | output |
* | --- |
* | "None. Cancel any time from your account. No cancellation fees." |
*
* @param {Faq_Subscription_Q2_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q2_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q2_answer();
	return en_faq_subscription_q2_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q3_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q3_QuestionInputs */
var en_faq_subscription_q3_question = () => {
	return `How do I cancel?`;
};
var am_faq_subscription_q3_question = () => {
	return `እንዴት ልሰርዝ እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "How do I cancel?" |
*
* @param {Faq_Subscription_Q3_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q3_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q3_question();
	return en_faq_subscription_q3_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q3_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q3_AnswerInputs */
var en_faq_subscription_q3_answer = () => {
	return `Account → Cancel Subscription. Your subscription ends at the close of the current billing period. You won't be charged again after that. You can also email hello@gotera.co.uk.`;
};
var am_faq_subscription_q3_answer = () => {
	return `መለያ → ደንበኝነት ምዝገባ ሰርዝ። ደንበኝነት ምዝገባዎ በአሁኑ የክፍያ ጊዜ መጨረሻ ላይ ያበቃል። ከዚያ በኋላ እንደገና አይከፈልብዎትም። በኢሜይልም hello@gotera.co.uk ላይ ማድረግ ይችላሉ።`;
};
/**
* | output |
* | --- |
* | "Account → Cancel Subscription. Your subscription ends at the close of the current billing period. You won't be charged again after that. You can also email h..." |
*
* @param {Faq_Subscription_Q3_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q3_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q3_answer();
	return en_faq_subscription_q3_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q4_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q4_QuestionInputs */
var en_faq_subscription_q4_question = () => {
	return `Can I pause or skip a delivery?`;
};
var am_faq_subscription_q4_question = () => {
	return `አቅርቦትን ማቆም ወይም መዝለል እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "Can I pause or skip a delivery?" |
*
* @param {Faq_Subscription_Q4_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q4_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q4_question();
	return en_faq_subscription_q4_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q4_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q4_AnswerInputs */
var en_faq_subscription_q4_answer = () => {
	return `Yes. Pause your subscription entirely with no time limit, or skip a single month's delivery — both from your account. Changes must be made before the cut-off date for the upcoming delivery, shown in your account.`;
};
var am_faq_subscription_q4_answer = () => {
	return `አዎ። ደንበኝነት ምዝገባዎን ያለ ምንም የጊዜ ገደብ ሙሉ በሙሉ ያቁሙ፣ ወይም የአንድ ወር አቅርቦት ብቻ ይዝለሉ — ሁለቱም ከመለያዎ ይከናወናሉ። ለቀጣዩ አቅርቦት ከመለያዎ በሚታየው የመቁረጫ ቀን በፊት ለውጦች መደረግ አለባቸው።`;
};
/**
* | output |
* | --- |
* | "Yes. Pause your subscription entirely with no time limit, or skip a single month's delivery — both from your account. Changes must be made before the cut-off..." |
*
* @param {Faq_Subscription_Q4_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q4_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q4_answer();
	return en_faq_subscription_q4_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q5_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q5_QuestionInputs */
var en_faq_subscription_q5_question = () => {
	return `Can I change my plan?`;
};
var am_faq_subscription_q5_question = () => {
	return `እቅዴን መቀየር እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "Can I change my plan?" |
*
* @param {Faq_Subscription_Q5_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q5_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q5_question();
	return en_faq_subscription_q5_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q5_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q5_AnswerInputs */
var en_faq_subscription_q5_answer = () => {
	return `Yes. Switch between Starter (2 packs, £12/month) and Regular (4 packs, £24/month) any time from your account. Changes take effect from the next billing cycle.`;
};
var am_faq_subscription_q5_answer = () => {
	return `አዎ። በማንኛውም ጊዜ ከመለያዎ በStarter (2 ጥቅሎች፣ £12/ወር) እና Regular (4 ጥቅሎች፣ £24/ወር) መካከል ይቀያየሩ። ለውጦች ከቀጣዩ የክፍያ ዑደት ጀምሮ ተግባራዊ ይሆናሉ።`;
};
/**
* | output |
* | --- |
* | "Yes. Switch between Starter (2 packs, £12/month) and Regular (4 packs, £24/month) any time from your account. Changes take effect from the next billing cycle." |
*
* @param {Faq_Subscription_Q5_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q5_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q5_answer();
	return en_faq_subscription_q5_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q6_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q6_QuestionInputs */
var en_faq_subscription_q6_question = () => {
	return `What are add-ons?`;
};
var am_faq_subscription_q6_question = () => {
	return `ተጨማሪ ውጤቶች (add-ons) ምንድን ናቸው?`;
};
/**
* | output |
* | --- |
* | "What are add-ons?" |
*
* @param {Faq_Subscription_Q6_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q6_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q6_question();
	return en_faq_subscription_q6_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_subscription_q6_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Subscription_Q6_AnswerInputs */
var en_faq_subscription_q6_answer = () => {
	return `Pantry products — currently Berbere (£3.50), Mitmita (£3.50), and Niter Kibbeh (£5.00) — that you can add to any monthly delivery. Select them from your account before the cut-off date. They are added to that month's payment.`;
};
var am_faq_subscription_q6_answer = () => {
	return `የግሮሰሪ ምርቶች — በአሁኑ ጊዜ በርበሬ (£3.50)፣ ሚጥሚጣ (£3.50)፣ እና ንጥር ቅቤ (£5.00) — ወደ ማንኛውም ወርሃዊ አቅርቦት ማከል ይችላሉ። ከመቁረጫ ቀኑ በፊት ከመለያዎ ይምረጡ። ወደ ያንን ወር ክፍያ ይታከላሉ።`;
};
/**
* | output |
* | --- |
* | "Pantry products — currently Berbere (£3.50), Mitmita (£3.50), and Niter Kibbeh (£5.00) — that you can add to any monthly delivery. Select them from your acco..." |
*
* @param {Faq_Subscription_Q6_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_subscription_q6_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_subscription_q6_answer();
	return en_faq_subscription_q6_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q1_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q1_QuestionInputs */
var en_faq_delivery_q1_question = () => {
	return `Where do you deliver?`;
};
var am_faq_delivery_q1_question = () => {
	return `የት ነው የምታደርሱት?`;
};
/**
* | output |
* | --- |
* | "Where do you deliver?" |
*
* @param {Faq_Delivery_Q1_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q1_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q1_question();
	return en_faq_delivery_q1_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q1_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q1_AnswerInputs */
var en_faq_delivery_q1_answer = () => {
	return `London only at launch. We are expanding to other UK cities in 2026. Email hello@gotera.co.uk to register interest for your area.`;
};
var am_faq_delivery_q1_answer = () => {
	return `በመጀመሪያ ደረጃ ለንደን ብቻ። በ2026 ወደ ሌሎች የዩኬ ከተሞች እየተስፋፋን ነው። ለአካባቢዎ ፍላጎት ለማስመዝገብ hello@gotera.co.uk ላይ ኢሜይል ያድርጉ።`;
};
/**
* | output |
* | --- |
* | "London only at launch. We are expanding to other UK cities in 2026. Email hello@gotera.co.uk to register interest for your area." |
*
* @param {Faq_Delivery_Q1_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q1_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q1_answer();
	return en_faq_delivery_q1_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q2_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q2_QuestionInputs */
var en_faq_delivery_q2_question = () => {
	return `When do you deliver?`;
};
var am_faq_delivery_q2_question = () => {
	return `መቼ ነው የምታደርሱት?`;
};
/**
* | output |
* | --- |
* | "When do you deliver?" |
*
* @param {Faq_Delivery_Q2_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q2_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q2_question();
	return en_faq_delivery_q2_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q2_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q2_AnswerInputs */
var en_faq_delivery_q2_answer = () => {
	return `Saturdays, between 8am and 6pm. You'll receive a notification with a tighter window on the morning of your delivery.`;
};
var am_faq_delivery_q2_answer = () => {
	return `ቅዳሜ፣ ከጠዋቱ 8 ሰዓት እስከ ምሽቱ 6 ሰዓት። በአቅርቦት ቀንዎ ጠዋት ጠበብ ያለ ጊዜ ማሳወቂያ ይደርስዎታል።`;
};
/**
* | output |
* | --- |
* | "Saturdays, between 8am and 6pm. You'll receive a notification with a tighter window on the morning of your delivery." |
*
* @param {Faq_Delivery_Q2_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q2_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q2_answer();
	return en_faq_delivery_q2_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q3_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q3_QuestionInputs */
var en_faq_delivery_q3_question = () => {
	return `What is the cut-off date?`;
};
var am_faq_delivery_q3_question = () => {
	return `የመቁረጫ ቀኑ ምንድን ነው?`;
};
/**
* | output |
* | --- |
* | "What is the cut-off date?" |
*
* @param {Faq_Delivery_Q3_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q3_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q3_question();
	return en_faq_delivery_q3_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q3_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q3_AnswerInputs */
var en_faq_delivery_q3_answer = () => {
	return `The Sunday before your Saturday delivery at midnight. Changes — add-ons, address updates, skips — made after the cut-off apply to the following month. Your exact cut-off is shown in your account.`;
};
var am_faq_delivery_q3_answer = () => {
	return `ከቅዳሜ አቅርቦትዎ በፊት ያለው እሁድ እኩለ ሌሊት። ከመቁረጫ ቀኑ በኋላ የሚደረጉ ለውጦች — ተጨማሪ ውጤቶች፣ አድራሻ ማዘመን፣ መዝለሎች — ለሚቀጥለው ወር ተግባራዊ ይሆናሉ። ትክክለኛው የመቁረጫ ቀንዎ በመለያዎ ውስጥ ይታያል።`;
};
/**
* | output |
* | --- |
* | "The Sunday before your Saturday delivery at midnight. Changes — add-ons, address updates, skips — made after the cut-off apply to the following month. Your e..." |
*
* @param {Faq_Delivery_Q3_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q3_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q3_answer();
	return en_faq_delivery_q3_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q4_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q4_QuestionInputs */
var en_faq_delivery_q4_question = () => {
	return `What if I'm not home?`;
};
var am_faq_delivery_q4_question = () => {
	return `ቤት ካልነበርኩ ምን ይሆናል?`;
};
/**
* | output |
* | --- |
* | "What if I'm not home?" |
*
* @param {Faq_Delivery_Q4_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q4_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q4_question();
	return en_faq_delivery_q4_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q4_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q4_AnswerInputs */
var en_faq_delivery_q4_answer = () => {
	return `Set a safe place in your account and we'll leave your order there. If no safe place is set and you're not home, we'll leave a card with instructions. Temperature-sensitive orders won't be left in locations exposed to heat.`;
};
var am_faq_delivery_q4_answer = () => {
	return `በመለያዎ ውስጥ ደህንነቱ የተጠበቀ ቦታ ያዘጋጁ እና ትዕዛዝዎን እዚያ እናስቀምጣለን። ደህንነቱ የተጠበቀ ቦታ ካልተዘጋጀ እና ቤት ካልነበሩ፣ መመሪያ ያለበት ካርድ እንተዋለን። ለሙቀት ስሜታዊ የሆኑ ትዕዛዞች ለሙቀት በተጋለጡ ቦታዎች አይተዉም።`;
};
/**
* | output |
* | --- |
* | "Set a safe place in your account and we'll leave your order there. If no safe place is set and you're not home, we'll leave a card with instructions. Tempera..." |
*
* @param {Faq_Delivery_Q4_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q4_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q4_answer();
	return en_faq_delivery_q4_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q5_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q5_QuestionInputs */
var en_faq_delivery_q5_question = () => {
	return `My order hasn't arrived. What do I do?`;
};
var am_faq_delivery_q5_question = () => {
	return `ትዕዛዜ አልደረሰኝም። ምን ላድርግ?`;
};
/**
* | output |
* | --- |
* | "My order hasn't arrived. What do I do?" |
*
* @param {Faq_Delivery_Q5_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q5_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q5_question();
	return en_faq_delivery_q5_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_delivery_q5_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Delivery_Q5_AnswerInputs */
var en_faq_delivery_q5_answer = () => {
	return `Contact us within 48 hours at hello@gotera.co.uk. We respond within 4 hours on delivery days. Confirmed lost orders get a replacement or account credit. Full details on the Delivery page.`;
};
var am_faq_delivery_q5_answer = () => {
	return `በ48 ሰዓታት ውስጥ hello@gotera.co.uk ላይ ያግኙን። በአቅርቦት ቀናት ውስጥ በ4 ሰዓታት ውስጥ እንመልስልዎታለን። የጠፉ ትዕዛዞች ከተረጋገጡ ምትክ ወይም የመለያ ክሬዲት ያገኛሉ። ሙሉ ዝርዝሮች በአቅርቦት ገጽ ላይ ይገኛሉ።`;
};
/**
* | output |
* | --- |
* | "Contact us within 48 hours at hello@gotera.co.uk. We respond within 4 hours on delivery days. Confirmed lost orders get a replacement or account credit. Full..." |
*
* @param {Faq_Delivery_Q5_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_delivery_q5_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_delivery_q5_answer();
	return en_faq_delivery_q5_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_gifting_q1_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Gifting_Q1_QuestionInputs */
var en_faq_gifting_q1_question = () => {
	return `How does a gift order work?`;
};
var am_faq_gifting_q1_question = () => {
	return `የስጦታ ትዕዛዝ እንዴት ይሰራል?`;
};
/**
* | output |
* | --- |
* | "How does a gift order work?" |
*
* @param {Faq_Gifting_Q1_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_gifting_q1_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_gifting_q1_question();
	return en_faq_gifting_q1_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_gifting_q1_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Gifting_Q1_AnswerInputs */
var en_faq_gifting_q1_answer = () => {
	return `Choose a gift size (single or double pack), add any pantry extras, enter the recipient's address, and pay once. No subscription is created for the recipient. A confirmation goes to your email.`;
};
var am_faq_gifting_q1_answer = () => {
	return `የስጦታ መጠን ይምረጡ (ነጠላ ወይም ድርብ ጥቅል)፣ ማንኛውንም የግሮሰሪ ተጨማሪዎች ያክሉ፣ የተቀባዩን አድራሻ ያስገቡ፣ እና አንድ ጊዜ ይክፈሉ። ለተቀባዩ ምንም ደንበኝነት ምዝገባ አይፈጠርም። ማረጋገጫ ወደ ኢሜይልዎ ይላካል።`;
};
/**
* | output |
* | --- |
* | "Choose a gift size (single or double pack), add any pantry extras, enter the recipient's address, and pay once. No subscription is created for the recipient...." |
*
* @param {Faq_Gifting_Q1_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_gifting_q1_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_gifting_q1_answer();
	return en_faq_gifting_q1_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_gifting_q2_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Gifting_Q2_QuestionInputs */
var en_faq_gifting_q2_question = () => {
	return `Can I include a message?`;
};
var am_faq_gifting_q2_question = () => {
	return `መልእክት ማካተት እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "Can I include a message?" |
*
* @param {Faq_Gifting_Q2_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_gifting_q2_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_gifting_q2_question();
	return en_faq_gifting_q2_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_gifting_q2_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Gifting_Q2_AnswerInputs */
var en_faq_gifting_q2_answer = () => {
	return `Yes. There is a message field in the gift checkout. Keep it short — it will be included with the order.`;
};
var am_faq_gifting_q2_answer = () => {
	return `አዎ። በስጦታ ክፍያ ማጠናቀቂያ ውስጥ የመልእክት መስክ አለ። አጭር ያድርጉት — ከትዕዛዙ ጋር ይካተታል።`;
};
/**
* | output |
* | --- |
* | "Yes. There is a message field in the gift checkout. Keep it short — it will be included with the order." |
*
* @param {Faq_Gifting_Q2_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_gifting_q2_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_gifting_q2_answer();
	return en_faq_gifting_q2_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_gifting_q3_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Gifting_Q3_QuestionInputs */
var en_faq_gifting_q3_question = () => {
	return `Does the recipient need a GOTERA account?`;
};
var am_faq_gifting_q3_question = () => {
	return `ተቀባዩ የGOTERA መለያ ያስፈልገዋል?`;
};
/**
* | output |
* | --- |
* | "Does the recipient need a GOTERA account?" |
*
* @param {Faq_Gifting_Q3_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_gifting_q3_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_gifting_q3_question();
	return en_faq_gifting_q3_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_gifting_q3_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Gifting_Q3_AnswerInputs */
var en_faq_gifting_q3_answer = () => {
	return `No. A gift is a one-time order. The recipient does not need an account and is not signed up to any subscription.`;
};
var am_faq_gifting_q3_answer = () => {
	return `አይ። ስጦታ የአንድ ጊዜ ትዕዛዝ ነው። ተቀባዩ መለያ አያስፈልገውም እና ለምንም ደንበኝነት ምዝገባ አይመዘገብም።`;
};
/**
* | output |
* | --- |
* | "No. A gift is a one-time order. The recipient does not need an account and is not signed up to any subscription." |
*
* @param {Faq_Gifting_Q3_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_gifting_q3_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_gifting_q3_answer();
	return en_faq_gifting_q3_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_account_q1_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Account_Q1_QuestionInputs */
var en_faq_account_q1_question = () => {
	return `How do I update my delivery address?`;
};
var am_faq_account_q1_question = () => {
	return `የመላኪያ አድራሻዬን እንዴት ማዘመን እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "How do I update my delivery address?" |
*
* @param {Faq_Account_Q1_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_account_q1_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_account_q1_question();
	return en_faq_account_q1_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_account_q1_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Account_Q1_AnswerInputs */
var en_faq_account_q1_answer = () => {
	return `Account → Your Details → Update Address. Changes before the cut-off apply to the next delivery. Changes after the cut-off apply the following month.`;
};
var am_faq_account_q1_answer = () => {
	return `መለያ → የእርስዎ ዝርዝሮች → አድራሻ አዘምን። ከመቁረጫ ቀኑ በፊት የሚደረጉ ለውጦች ለቀጣዩ አቅርቦት ተግባራዊ ይሆናሉ። ከመቁረጫ ቀኑ በኋላ የሚደረጉ ለውጦች ለሚቀጥለው ወር ተግባራዊ ይሆናሉ።`;
};
/**
* | output |
* | --- |
* | "Account → Your Details → Update Address. Changes before the cut-off apply to the next delivery. Changes after the cut-off apply the following month." |
*
* @param {Faq_Account_Q1_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_account_q1_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_account_q1_answer();
	return en_faq_account_q1_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_account_q2_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Account_Q2_QuestionInputs */
var en_faq_account_q2_question = () => {
	return `How do I update my payment method?`;
};
var am_faq_account_q2_question = () => {
	return `የክፍያ ዘዴዬን እንዴት ማዘመን እችላለሁ?`;
};
/**
* | output |
* | --- |
* | "How do I update my payment method?" |
*
* @param {Faq_Account_Q2_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_account_q2_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_account_q2_question();
	return en_faq_account_q2_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_account_q2_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Account_Q2_AnswerInputs */
var en_faq_account_q2_answer = () => {
	return `Account → Payment → Update Payment. Your new card is saved and used for all future billing.`;
};
var am_faq_account_q2_answer = () => {
	return `መለያ → ክፍያ → ክፍያ አዘምን። አዲሱ ካርድዎ ተቀምጦ ለወደፊት ክፍያዎች ሁሉ ጥቅም ላይ ይውላል።`;
};
/**
* | output |
* | --- |
* | "Account → Payment → Update Payment. Your new card is saved and used for all future billing." |
*
* @param {Faq_Account_Q2_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_account_q2_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_account_q2_answer();
	return en_faq_account_q2_answer();
});
//#endregion
//#region src/lib/paraglide/messages/faq_account_q3_question.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Account_Q3_QuestionInputs */
var en_faq_account_q3_question = () => {
	return `I forgot my password. What do I do?`;
};
var am_faq_account_q3_question = () => {
	return `የይለፍ ቃሌን ረሳሁ። ምን ላድርግ?`;
};
/**
* | output |
* | --- |
* | "I forgot my password. What do I do?" |
*
* @param {Faq_Account_Q3_QuestionInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_account_q3_question = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_account_q3_question();
	return en_faq_account_q3_question();
});
//#endregion
//#region src/lib/paraglide/messages/faq_account_q3_answer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Faq_Account_Q3_AnswerInputs */
var en_faq_account_q3_answer = () => {
	return `Use the "Forgot your password?" link on the sign in page. A reset link will be sent to your registered email address.`;
};
var am_faq_account_q3_answer = () => {
	return `በመግቢያ ገጹ ላይ ያለውን "የይለፍ ቃልዎን ረስተዋል?" የሚለውን አገናኝ ይጠቀሙ። የማደሻ አገናኝ ወደ የተመዘገበው ኢሜይል አድራሻዎ ይላካል።`;
};
/**
* | output |
* | --- |
* | "Use the \"Forgot your password?\" link on the sign in page. A reset link will be sent to your registered email address." |
*
* @param {Faq_Account_Q3_AnswerInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var faq_account_q3_answer = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_faq_account_q3_answer();
	return en_faq_account_q3_answer();
});
//#endregion
//#region src/routes/faq/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let faqData = derived(() => [
			{
				category: faq_cat_product(),
				items: [
					{
						q: faq_product_q1_question(),
						a: faq_product_q1_answer(),
						defaultOpen: true
					},
					{
						q: faq_product_q2_question(),
						a: faq_product_q2_answer()
					},
					{
						q: faq_product_q3_question(),
						a: faq_product_q3_answer()
					},
					{
						q: faq_product_q4_question(),
						a: faq_product_q4_answer()
					},
					{
						q: faq_product_q5_question(),
						a: faq_product_q5_answer()
					},
					{
						q: faq_product_q6_question(),
						a: faq_product_q6_answer()
					}
				]
			},
			{
				category: faq_cat_subscription(),
				items: [
					{
						q: faq_subscription_q1_question(),
						a: faq_subscription_q1_answer()
					},
					{
						q: faq_subscription_q2_question(),
						a: faq_subscription_q2_answer()
					},
					{
						q: faq_subscription_q3_question(),
						a: faq_subscription_q3_answer()
					},
					{
						q: faq_subscription_q4_question(),
						a: faq_subscription_q4_answer()
					},
					{
						q: faq_subscription_q5_question(),
						a: faq_subscription_q5_answer()
					},
					{
						q: faq_subscription_q6_question(),
						a: faq_subscription_q6_answer()
					}
				]
			},
			{
				category: faq_cat_delivery(),
				items: [
					{
						q: faq_delivery_q1_question(),
						a: faq_delivery_q1_answer()
					},
					{
						q: faq_delivery_q2_question(),
						a: faq_delivery_q2_answer()
					},
					{
						q: faq_delivery_q3_question(),
						a: faq_delivery_q3_answer()
					},
					{
						q: faq_delivery_q4_question(),
						a: faq_delivery_q4_answer()
					},
					{
						q: faq_delivery_q5_question(),
						a: faq_delivery_q5_answer()
					}
				]
			},
			{
				category: faq_cat_gifting(),
				items: [
					{
						q: faq_gifting_q1_question(),
						a: faq_gifting_q1_answer()
					},
					{
						q: faq_gifting_q2_question(),
						a: faq_gifting_q2_answer()
					},
					{
						q: faq_gifting_q3_question(),
						a: faq_gifting_q3_answer()
					}
				]
			},
			{
				category: faq_cat_account(),
				items: [
					{
						q: faq_account_q1_question(),
						a: faq_account_q1_answer()
					},
					{
						q: faq_account_q2_question(),
						a: faq_account_q2_answer()
					},
					{
						q: faq_account_q3_question(),
						a: faq_account_q3_answer()
					}
				]
			}
		]);
		let categories = derived(() => faqData().map((d) => d.category));
		let activeCategoryIndex = 0;
		/** @type {Record<string, boolean>} */
		let openAnswers = {};
		$$renderer.push(`<section class="hero svelte-1bex8oj"><div class="container svelte-1bex8oj"><span class="eyebrow svelte-1bex8oj">${escape_html(faq_hero_eyebrow())}</span> <h1 class="svelte-1bex8oj">${escape_html(faq_hero_title())}</h1> <p class="svelte-1bex8oj">${escape_html(faq_hero_subtitle())}</p></div></section> <div class="tabs svelte-1bex8oj"><div class="container svelte-1bex8oj"><div class="tab-list svelte-1bex8oj"><!--[-->`);
		const each_array = ensure_array_like(categories());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let category = each_array[index];
			$$renderer.push(`<button type="button"${attr_class("tab svelte-1bex8oj", void 0, { "active": activeCategoryIndex === index })}>${escape_html(category)}</button>`);
		}
		$$renderer.push(`<!--]--></div></div></div> <div class="faq-content svelte-1bex8oj"><div class="container svelte-1bex8oj"><!--[-->`);
		const each_array_1 = ensure_array_like(faqData());
		for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
			let group = each_array_1[index];
			if (activeCategoryIndex === index) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="faq-group svelte-1bex8oj"><h2 class="faq-group-title svelte-1bex8oj">${escape_html(group.category)}</h2> <div class="faq-list svelte-1bex8oj"><!--[-->`);
				const each_array_2 = ensure_array_like(group.items);
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let item = each_array_2[$$index_1];
					$$renderer.push(`<div class="faq-item svelte-1bex8oj"><button type="button"${attr_class("faq-q svelte-1bex8oj", void 0, { "open": openAnswers[item.q] })}>${escape_html(item.q)} <span class="faq-icon svelte-1bex8oj"></span></button> <div${attr_class("faq-a svelte-1bex8oj", void 0, { "open": openAnswers[item.q] })}>${escape_html(item.a)}</div></div>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></div> <section class="cta svelte-1bex8oj"><div class="container cta-inner svelte-1bex8oj"><span class="eyebrow svelte-1bex8oj">${escape_html(faq_cta_eyebrow())}</span> <h2 class="svelte-1bex8oj">${escape_html(faq_cta_title())}</h2> <p class="svelte-1bex8oj">${escape_html(faq_cta_subtitle())}</p> <a href="/subscribe" class="btn svelte-1bex8oj">${escape_html(faq_cta_button())}</a> <p class="cta-contact svelte-1bex8oj">${escape_html(faq_cta_contact_prefix())} <a href="mailto:hello@gotera.co.uk" class="svelte-1bex8oj">hello@gotera.co.uk</a> ${escape_html(faq_cta_contact_suffix())}</p></div></section>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DCyoKb-X.js.map
