import './exports.js-BT-QlP_6.js';
import { W as get, U as writable, X as derived$1, Y as readonly } from './server.js-CPNQ0GBv.js';
import { o as onDestroy, t as tick } from './index-server.js-C9rOfj9g.js';
import { b as afterNavigate, a as applyAction, i as invalidateAll } from './client.js-7a-rpZlk.js';
import { e as enhance, d as deserialize } from './forms.js-1iUoLEd8.js';
import { p as page, n as navigating } from './stores.js-DMULTZRY.js';
import { C as fail } from './utils.js-BQt5v-8G.js';
import { h as stringify, p as parse } from './shared.js-CgqsOrws.js';

// istanbul ignore next
const isObject = (obj) => {
    if (typeof obj === "object" && obj !== null) {
        if (typeof Object.getPrototypeOf === "function") {
            const prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
        }
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
    return false;
};
const UNSAFE_KEYS = new Set([
    "__proto__",
    "constructor",
    "prototype",
    "toString",
    "valueOf",
    "hasOwnProperty",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toLocaleString",
]);
const merge = (...objects) => objects.reduce((result, current) => {
    if (current === undefined) {
        return result;
    }
    if (Array.isArray(current)) {
        throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
    }
    Object.keys(current).forEach((key) => {
        if (UNSAFE_KEYS.has(key)) {
            return;
        }
        if (Array.isArray(result[key]) && Array.isArray(current[key])) {
            result[key] = merge.options.mergeArrays
                ? merge.options.uniqueArrayItems
                    ? Array.from(new Set(result[key].concat(current[key])))
                    : [...result[key], ...current[key]]
                : current[key];
        }
        else if (isObject(result[key]) && isObject(current[key])) {
            result[key] = merge(result[key], current[key]);
        }
        else if (!isObject(result[key]) && isObject(current[key])) {
            result[key] = merge(current[key], undefined);
        }
        else {
            result[key] =
                current[key] === undefined
                    ? merge.options.allowUndefinedOverrides
                        ? current[key]
                        : result[key]
                    : current[key];
        }
    });
    return result;
}, {});
const defaultOptions = {
    allowUndefinedOverrides: true,
    mergeArrays: true,
    uniqueArrayItems: true,
};
merge.options = defaultOptions;
merge.withOptions = (options, ...objects) => {
    merge.options = Object.assign(Object.assign({}, defaultOptions), options);
    const result = merge(...objects);
    merge.options = defaultOptions;
    return result;
};

//#region node_modules/sveltekit-superforms/dist/traversal.js
function setPath(parent, key, value) {
	if (key === "__proto__" || key === "prototype") throw new Error("Cannot set an object's `__proto__` or `prototype` property");
	parent[key] = value;
	return "skip";
}
function isInvalidPath(originalPath, pathData) {
	return pathData.value !== void 0 && typeof pathData.value !== "object" && pathData.path.length < originalPath.length;
}
function pathExists(obj, path, options = {}) {
	if (!options.modifier) options.modifier = (pathData) => isInvalidPath(path, pathData) ? void 0 : pathData.value;
	const exists = traversePath(obj, path, options.modifier);
	if (!exists) return void 0;
	if (options.value === void 0) return exists;
	return options.value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
	if (!realPath.length) return void 0;
	if (realPath.includes("__proto__") || realPath.includes("prototype")) throw new Error("Cannot set an object's `__proto__` or `prototype` property");
	const path = [realPath[0]];
	let parent = obj;
	while (parent && path.length < realPath.length) {
		const key = path[path.length - 1];
		const value = modifier ? modifier({
			parent,
			key: String(key),
			value: parent[key],
			path: path.map((p) => String(p)),
			isLeaf: false,
			set: (v) => setPath(parent, key, v)
		}) : parent[key];
		if (value === void 0) return void 0;
		else parent = value;
		path.push(realPath[path.length]);
	}
	if (!parent) return void 0;
	const key = realPath[realPath.length - 1];
	return {
		parent,
		key: String(key),
		value: parent[key],
		path: realPath.map((p) => String(p)),
		isLeaf: true,
		set: (v) => setPath(parent, key, v)
	};
}
function traversePaths(parent, modifier, path = []) {
	for (const key in parent) {
		const value = parent[key];
		const isLeaf = value === null || typeof value !== "object";
		const pathData = {
			parent,
			key,
			value,
			path: path.concat([key]),
			isLeaf,
			set: (v) => setPath(parent, key, v)
		};
		const status = modifier(pathData);
		if (status === "abort") return status;
		else if (status === "skip") continue;
		else if (!isLeaf) {
			const status = traversePaths(value, modifier, pathData.path);
			if (status === "abort") return status;
		}
	}
}
function eqSet(xs, ys) {
	return xs === ys || xs.size === ys.size && [...xs].every((x) => ys.has(x));
}
/**
* Compare two objects and return the differences as paths.
*/
function comparePaths(newObj, oldObj) {
	const diffPaths = /* @__PURE__ */ new Map();
	function builtInDiff(one, other) {
		if (one instanceof Date && other instanceof Date && one.getTime() !== other.getTime()) return true;
		if (one instanceof Set && other instanceof Set && !eqSet(one, other)) return true;
		if (one instanceof File && other instanceof File && one !== other) return true;
		return false;
	}
	function isBuiltin(data) {
		return data instanceof Date || data instanceof Set || data instanceof File;
	}
	function checkPath(data, compareTo) {
		const otherData = compareTo ? traversePath(compareTo, data.path) : void 0;
		function addDiff() {
			diffPaths.set(data.path.join(" "), data.path);
			return "skip";
		}
		if (isBuiltin(data.value)) {
			if (!isBuiltin(otherData?.value) || builtInDiff(data.value, otherData.value)) return addDiff();
		}
		if (data.isLeaf) {
			if (!otherData || data.value !== otherData.value) addDiff();
		}
	}
	traversePaths(newObj, (data) => checkPath(data, oldObj));
	traversePaths(oldObj, (data) => checkPath(data, newObj));
	const output = Array.from(diffPaths.values());
	output.sort((a, b) => a.length - b.length);
	return output;
}
function setPaths(obj, paths, value) {
	const isFunction = typeof value === "function";
	for (const path of paths) {
		const leaf = traversePath(obj, path, ({ parent, key, value }) => {
			if (value === void 0 || typeof value !== "object") parent[key] = {};
			return parent[key];
		});
		if (leaf) {
			if (leaf.key === "__proto__" || leaf.key === "prototype") throw new Error("Cannot set an object's `__proto__` or `prototype` property");
			leaf.parent[leaf.key] = isFunction ? value(path, leaf) : value;
		}
	}
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/stringPath.js
function splitPath(path) {
	return path.toString().split(/[[\].]+/).filter((p) => p);
}
function mergePath(path) {
	return path.reduce((acc, next) => {
		const key = String(next);
		if (typeof next === "number" || /^\d+$/.test(key)) acc += `[${key}]`;
		else if (!acc) acc += key;
		else acc += `.${key}`;
		return acc;
	}, "");
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/justClone.js
function clone$1(obj) {
	const type = {}.toString.call(obj).slice(8, -1);
	if (type == "Set") return new Set([...obj].map((value) => clone$1(value)));
	if (type == "Map") return new Map([...obj].map((kv) => [clone$1(kv[0]), clone$1(kv[1])]));
	if (type == "Date") return new Date(obj.getTime());
	if (type == "RegExp") return RegExp(obj.source, obj.flags);
	if (type == "Array" || type == "Object") {
		const result = type == "Object" ? Object.create(Object.getPrototypeOf(obj)) : [];
		for (const key in obj) result[key] = clone$1(obj[key]);
		return result;
	}
	return obj;
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/utils.js
function clone(data) {
	return data && typeof data === "object" ? clone$1(data) : data;
}
function assertSchema(schema, path) {
	if (typeof schema === "boolean") throw new SchemaError("Schema property cannot be defined as boolean.", path);
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/jsonSchema/schemaInfo.js
var conversionFormatTypes = [
	"unix-time",
	"bigint",
	"any",
	"symbol",
	"set",
	"map",
	"int64",
	"stringbool"
];
/**
* Normalizes the different kind of schema variations (anyOf, oneOf, union, const null, etc)
* to figure out the field type, optional, nullable, etc.
*/
function schemaInfo(schema, isOptional, path) {
	assertSchema(schema, path);
	const types = schemaTypes(schema, path);
	const array = schema.items && types.includes("array") ? (Array.isArray(schema.items) ? schema.items : [schema.items]).filter((s) => typeof s !== "boolean") : void 0;
	const additionalProperties = schema.additionalProperties && typeof schema.additionalProperties === "object" && types.includes("object") ? Object.fromEntries(Object.entries(schema.additionalProperties).filter(([, value]) => typeof value !== "boolean")) : void 0;
	const properties = schema.properties && types.includes("object") ? Object.fromEntries(Object.entries(schema.properties).filter(([, value]) => typeof value !== "boolean")) : void 0;
	const union = unionInfo(schema)?.filter((u) => u.type !== "null" && u.const !== null);
	const result = {
		types: types.filter((s) => s !== "null"),
		isOptional,
		isNullable: types.includes("null"),
		schema,
		union: union?.length ? union : void 0,
		array,
		properties,
		additionalProperties,
		required: schema.required
	};
	if (!schema.allOf || !schema.allOf.length) return result;
	return {
		...merge.withOptions({ allowUndefinedOverrides: false }, result, ...schema.allOf.map((s) => schemaInfo(s, false, []))),
		schema
	};
}
function schemaTypes(schema, path) {
	assertSchema(schema, path);
	let types = schema.const === null ? ["null"] : [];
	if (schema.type) types = Array.isArray(schema.type) ? schema.type : [schema.type];
	if (schema.anyOf) types = schema.anyOf.flatMap((s) => schemaTypes(s, path));
	if (schema.oneOf) types = schema.oneOf.flatMap((s) => schemaTypes(s, path));
	if (types.includes("array") && schema.uniqueItems) {
		const i = types.findIndex((t) => t === "array");
		if (i !== -1) types[i] = "set";
	} else if (schema.format && conversionFormatTypes.includes(schema.format)) {
		types.unshift(schema.format);
		if (schema.format == "unix-time" || schema.format == "int64") {
			const i = types.findIndex((t) => t == "integer");
			types.splice(i, 1);
		}
		if (schema.format == "bigint") {
			const i = types.findIndex((t) => t == "string");
			types.splice(i, 1);
		}
		if (schema.format == "stringbool") {
			const i = types.findIndex((t) => t == "string");
			if (i !== -1) types.splice(i, 1);
		}
	}
	if (schema.const && schema.const !== null && typeof schema.const !== "function") types.push(typeof schema.const);
	return Array.from(new Set(types));
}
function unionInfo(schema) {
	if (!schema.oneOf && !schema.anyOf) return void 0;
	if (schema.oneOf && schema.oneOf.length) return schema.oneOf.filter((s) => typeof s !== "boolean");
	if (schema.anyOf && schema.anyOf.length) return schema.anyOf.filter((s) => typeof s !== "boolean");
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/jsonSchema/schemaDefaults.js
function defaultValues(schema, isOptional = false, path = []) {
	return _defaultValues(schema, isOptional, path);
}
function _defaultValues(schema, isOptional, path) {
	if (!schema) throw new SchemaError("Schema was undefined", path);
	const info = schemaInfo(schema, isOptional, path);
	if (!info) return void 0;
	let objectDefaults = void 0;
	if ("default" in schema) if (info.types.includes("object") && schema.default && typeof schema.default == "object" && !Array.isArray(schema.default)) objectDefaults = schema.default;
	else {
		if (info.types.length > 1) {
			if (info.types.includes("unix-time") && (info.types.includes("integer") || info.types.includes("number"))) throw new SchemaError("Cannot resolve a default value with a union that includes a date and a number/integer.", path);
		}
		const [type] = info.types;
		return formatDefaultValue(type, schema.default);
	}
	let _multiType;
	const isMultiTypeUnion = () => {
		if (!info.union || info.union.length < 2) return false;
		if (info.union.some((i) => i.enum)) return true;
		if (!_multiType) _multiType = new Set(info.types.map((i) => {
			return ["integer", "unix-time"].includes(i) ? "number" : i;
		}));
		return _multiType.size > 1;
	};
	let output = void 0;
	if (!objectDefaults && info.union) {
		const singleDefault = info.union.filter((s) => typeof s !== "boolean" && s.default !== void 0);
		if (singleDefault.length == 1) return _defaultValues(singleDefault[0], isOptional, path);
		else if (singleDefault.length > 1) throw new SchemaError("Only one default value can exist in a union, or set a default value for the whole union.", path);
		else {
			if (info.isNullable) return null;
			if (info.isOptional) return void 0;
			if (isMultiTypeUnion()) throw new SchemaError("Multi-type unions must have a default value, or exactly one of the union types must have.", path);
			if (info.union.length) if (info.types[0] == "object") {
				if (output === void 0) output = {};
				output = info.union.length > 1 ? merge.withOptions({ allowUndefinedOverrides: true }, ...info.union.map((s) => _defaultValues(s, isOptional, path))) : _defaultValues(info.union[0], isOptional, path);
			} else return _defaultValues(info.union[0], isOptional, path);
		}
	}
	if (!objectDefaults) {
		if (info.isNullable) return null;
		if (info.isOptional) return void 0;
	}
	if (info.properties) for (const [key, objSchema] of Object.entries(info.properties)) {
		assertSchema(objSchema, [...path, key]);
		let def;
		if (objectDefaults && objectDefaults[key] !== void 0) try {
			const propInfo = schemaInfo(objSchema, !info.required?.includes(key), [...path, key]);
			if (propInfo) {
				const propType = propInfo.types[0];
				if (propType === "object" && typeof objectDefaults[key] === "object" && objectDefaults[key] !== null && !Array.isArray(objectDefaults[key])) def = _defaultValues({
					...objSchema,
					default: objectDefaults[key]
				}, !info.required?.includes(key), [...path, key]);
				else def = formatDefaultValue(propType, objectDefaults[key]);
			} else def = objectDefaults[key];
		} catch {
			def = objectDefaults[key];
		}
		else def = _defaultValues(objSchema, !info.required?.includes(key), [...path, key]);
		if (output === void 0) output = {};
		output[key] = def;
	}
	else if (objectDefaults) return objectDefaults;
	if (schema.enum) return schema.enum[0];
	if ("const" in schema) return schema.const;
	if (isMultiTypeUnion()) throw new SchemaError("Default values cannot have more than one type.", path);
	else if (info.types.length == 0) return;
	const [formatType] = info.types;
	return output ?? defaultValue(formatType, schema.enum);
}
function formatDefaultValue(type, value) {
	switch (type) {
		case "set": return Array.isArray(value) ? new Set(value) : value;
		case "map": return Array.isArray(value) ? new Map(value) : value;
		case "Date":
		case "date":
		case "unix-time":
			if (typeof value === "string" || typeof value === "number") return new Date(value);
			break;
		case "bigint":
			if (typeof value === "string" || typeof value === "number") return BigInt(value);
			break;
		case "symbol":
			if (typeof value === "string" || typeof value === "number") return Symbol(value);
			break;
	}
	return value;
}
function defaultValue(type, enumType) {
	switch (type) {
		case "string": return enumType && enumType.length > 0 ? enumType[0] : "";
		case "number":
		case "integer": return enumType && enumType.length > 0 ? enumType[0] : 0;
		case "boolean": return false;
		case "array": return [];
		case "object": return {};
		case "null": return null;
		case "Date":
		case "date":
		case "unix-time": return;
		case "int64":
		case "bigint": return BigInt(0);
		case "stringbool": return "";
		case "set": return /* @__PURE__ */ new Set();
		case "map": return /* @__PURE__ */ new Map();
		case "symbol": return Symbol();
		case "undefined":
		case "any": return;
		default: throw new SchemaError("Schema type or format not supported, requires explicit default value: " + type);
	}
}
function defaultTypes(schema, path = []) {
	return _defaultTypes(schema, false, path);
}
function _defaultTypes(schema, isOptional, path) {
	if (!schema) throw new SchemaError("Schema was undefined", path);
	const info = schemaInfo(schema, isOptional, path);
	let output = { __types: info.types };
	if (info.union) output = merge(output, ...info.union.map((u) => _defaultTypes(u, info.isOptional, path)));
	if (info.schema.items && typeof info.schema.items == "object" && !Array.isArray(info.schema.items)) output.__items = _defaultTypes(info.schema.items, info.isOptional, path);
	if (info.properties) for (const [key, value] of Object.entries(info.properties)) {
		assertSchema(value, [...path, key]);
		output[key] = _defaultTypes(info.properties[key], !info.required?.includes(key), [...path, key]);
	}
	if (info.additionalProperties && info.types.includes("object")) {
		const additionalInfo = schemaInfo(info.additionalProperties, info.isOptional, path);
		if (additionalInfo.properties && additionalInfo.types.includes("object")) for (const [key] of Object.entries(additionalInfo.properties)) output[key] = _defaultTypes(additionalInfo.properties[key], !additionalInfo.required?.includes(key), [...path, key]);
	}
	if (info.isNullable && !output.__types.includes("null")) output.__types.push("null");
	if (info.isOptional && !output.__types.includes("undefined")) output.__types.push("undefined");
	return output;
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/errors.js
var SuperFormError = class SuperFormError extends Error {
	constructor(message) {
		super(message);
		Object.setPrototypeOf(this, SuperFormError.prototype);
	}
};
var SchemaError = class SchemaError extends SuperFormError {
	path;
	constructor(message, path) {
		super((path && path.length ? `[${Array.isArray(path) ? path.join(".") : path}] ` : "") + message);
		this.path = Array.isArray(path) ? path.join(".") : path;
		Object.setPrototypeOf(this, SchemaError.prototype);
	}
};
function mapErrors(errors, shape) {
	const output = {};
	function addFormLevelError(error) {
		if (!("_errors" in output)) output._errors = [];
		if (!Array.isArray(output._errors)) if (typeof output._errors === "string") output._errors = [output._errors];
		else throw new SuperFormError("Form-level error was not an array.");
		output._errors.push(error.message);
	}
	for (const error of errors) {
		if (!error.path || error.path.length == 1 && !error.path[0]) {
			addFormLevelError(error);
			continue;
		}
		const objectError = !/^\d$/.test(String(error.path[error.path.length - 1])) && pathExists(shape, error.path.filter((p) => /\D/.test(String(p))))?.value;
		const leaf = traversePath(output, error.path, ({ value, parent, key }) => {
			if (value === void 0) parent[key] = {};
			return parent[key];
		});
		if (!leaf) {
			addFormLevelError(error);
			continue;
		}
		const { parent, key } = leaf;
		if (objectError) {
			if (!(key in parent)) parent[key] = {};
			if (!("_errors" in parent[key])) parent[key]._errors = [error.message];
			else parent[key]._errors.push(error.message);
		} else if (!(key in parent)) parent[key] = [error.message];
		else parent[key].push(error.message);
	}
	return output;
}
/**
* Filter errors based on validation method.
* auto = Requires the existence of errors and tainted (field in store) to show
* oninput = Set directly
*/
function updateErrors(New, Previous, force) {
	if (force) return New;
	traversePaths(Previous, (errors) => {
		if (!Array.isArray(errors.value)) return;
		errors.set(void 0);
	});
	traversePaths(New, (error) => {
		if (!Array.isArray(error.value) && error.value !== void 0) return;
		setPaths(Previous, [error.path], error.value);
	});
	return Previous;
}
function flattenErrors(errors) {
	return _flattenErrors(errors, []);
}
function _flattenErrors(errors, path) {
	return Object.entries(errors).filter(([, value]) => value !== void 0).flatMap(([key, messages]) => {
		if (Array.isArray(messages) && messages.length > 0) return {
			path: mergePath(path.concat([key])),
			messages
		};
		else return _flattenErrors(errors[key], path.concat([key]));
	});
}
/**
* Merge defaults with parsed data.
*/
function mergeDefaults(parsedData, defaults) {
	if (!parsedData) return clone(defaults);
	return merge.withOptions({ mergeArrays: false }, defaults, parsedData);
}
/**
* Merge defaults with (important!) *already validated and merged data*.
* @DCI-context
*/
function replaceInvalidDefaults(Data, Defaults, _schema, Errors, preprocessed) {
	const defaultType = _schema.additionalProperties && typeof _schema.additionalProperties == "object" ? { __types: schemaInfo(_schema.additionalProperties, false, []).types } : void 0;
	const Types = defaultTypes(_schema);
	function Types_correctValue(dataValue, defValue, type) {
		const types = type.__types;
		if (!types.length || types.every((t) => t == "undefined" || t == "null" || t == "any")) return dataValue;
		else if (types.length == 1 && types[0] == "array" && !type.__items) return dataValue;
		const dateTypes = [
			"unix-time",
			"Date",
			"date"
		];
		for (const schemaType of types) {
			const defaultTypeValue = defaultValue(schemaType, void 0);
			const sameType = typeof dataValue === typeof defaultTypeValue || dateTypes.includes(schemaType) && dataValue instanceof Date;
			if (sameType && sameType && dataValue === null === (defaultTypeValue === null)) return dataValue;
			else if (type.__items) return Types_correctValue(dataValue, defValue, type.__items);
		}
		if (defValue === void 0 && types.includes("null")) return null;
		return defValue;
	}
	function Data_traverse() {
		traversePaths(Defaults, Defaults_traverseAndReplace);
		Errors_traverseAndReplace();
		return Data;
	}
	function Data_setValue(currentPath, newValue) {
		setPaths(Data, [currentPath], newValue);
	}
	function Errors_traverseAndReplace() {
		for (const error of Errors) {
			if (!error.path) continue;
			Defaults_traverseAndReplace({
				path: error.path,
				value: pathExists(Defaults, error.path)?.value
			}, true);
		}
	}
	function Defaults_traverseAndReplace(defaultPath, traversingErrors = false) {
		const currentPath = defaultPath.path;
		if (!currentPath || !currentPath[0]) return;
		if (typeof currentPath[0] === "string" && preprocessed?.includes(currentPath[0])) return;
		const dataPath = pathExists(Data, currentPath);
		if (!dataPath && defaultPath.value !== void 0 || dataPath && dataPath.value === void 0) Data_setValue(currentPath, defaultPath.value);
		else if (dataPath) {
			const defValue = defaultPath.value;
			const dataValue = dataPath.value;
			if (defValue !== void 0 && typeof dataValue === typeof defValue && dataValue === null === (defValue === null)) return;
			const typePath = currentPath.filter((p) => /\D/.test(String(p)));
			const pathTypes = traversePath(Types, typePath, (path) => {
				return path.value && "__items" in path.value ? path.value.__items : path.value;
			});
			if (!pathTypes) {
				if (traversingErrors) return;
				throw new SchemaError("No types found for defaults", currentPath);
			}
			const fieldType = pathTypes.value ?? defaultType;
			if (fieldType) {
				const corrected = Types_correctValue(dataValue, defValue, fieldType);
				if (corrected === dataValue) return "skip";
				Data_setValue(currentPath, corrected);
			}
		}
	}
	return Data_traverse();
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/client/flash.js
function cancelFlash(options) {
	if (!options.flashMessage || true) return;
}
function shouldSyncFlash(options) {
	if (!options.flashMessage || true) return false;
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/client/customValidity.js
var noCustomValidityDataAttribute = "noCustomValidity";
async function updateCustomValidity(validityEl, errors) {
	if ("setCustomValidity" in validityEl) validityEl.setCustomValidity("");
	if (noCustomValidityDataAttribute in validityEl.dataset) return;
	setCustomValidity(validityEl, errors);
}
function setCustomValidityForm(formElement, errors) {
	for (const el of formElement.querySelectorAll("input,select,textarea,button")) {
		if ("dataset" in el && noCustomValidityDataAttribute in el.dataset || !el.name) continue;
		const path = traversePath(errors, splitPath(el.name));
		const error = path && typeof path.value === "object" && "_errors" in path.value ? path.value._errors : path?.value;
		setCustomValidity(el, error);
		if (error) return;
	}
}
function setCustomValidity(el, errors) {
	if (!("setCustomValidity" in el)) return;
	const message = errors && errors.length ? errors.join("\n") : "";
	el.setCustomValidity(message);
	if (message) el.reportValidity();
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/client/elements.js
var isElementInViewport = (el, topOffset = 0) => {
	const rect = el.getBoundingClientRect();
	return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
var scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
	const top = el.getBoundingClientRect().top + window.pageYOffset - window.innerHeight / (2 * offset);
	window.scrollTo({
		left: 0,
		top,
		behavior
	});
};
var immediateInputTypes = [
	"checkbox",
	"radio",
	"range",
	"file"
];
/**
* Information about a HTML element, for determining when to display errors.
*/
function inputInfo(el) {
	return {
		immediate: !!el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type)),
		multiple: !!el && el instanceof HTMLSelectElement && el.multiple,
		file: !!el && el instanceof HTMLInputElement && el.type == "file"
	};
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/client/form.js
var FetchStatus;
(function(FetchStatus) {
	FetchStatus[FetchStatus["Idle"] = 0] = "Idle";
	FetchStatus[FetchStatus["Submitting"] = 1] = "Submitting";
	FetchStatus[FetchStatus["Delayed"] = 2] = "Delayed";
	FetchStatus[FetchStatus["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
var activeTimers = /* @__PURE__ */ new Set();
/**
* @DCI-context
*/
function Form(formElement, timers, options) {
	let state = FetchStatus.Idle;
	let delayedTimeout, timeoutTimeout;
	const Timers = activeTimers;
	function Timers_start() {
		Timers_clear();
		Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
		delayedTimeout = window.setTimeout(() => {
			if (delayedTimeout && state == FetchStatus.Submitting) Timers_setState(FetchStatus.Delayed);
		}, options.delayMs);
		timeoutTimeout = window.setTimeout(() => {
			if (timeoutTimeout && state == FetchStatus.Delayed) Timers_setState(FetchStatus.Timeout);
		}, options.timeoutMs);
		Timers.add(Timers_clear);
	}
	/**
	* Clear timers and set state to Idle.
	*/
	function Timers_clear() {
		clearTimeout(delayedTimeout);
		clearTimeout(timeoutTimeout);
		delayedTimeout = timeoutTimeout = 0;
		Timers.delete(Timers_clear);
		Timers_setState(FetchStatus.Idle);
	}
	function Timers_clearAll() {
		Timers.forEach((t) => t());
		Timers.clear();
	}
	function Timers_setState(s) {
		state = s;
		timers.submitting.set(state >= FetchStatus.Submitting);
		timers.delayed.set(state >= FetchStatus.Delayed);
		timers.timeout.set(state >= FetchStatus.Timeout);
	}
	const ErrorTextEvents = formElement;
	function ErrorTextEvents__selectText(e) {
		const target = e.target;
		if (options.selectErrorText) target.select();
	}
	function ErrorTextEvents_addErrorTextListeners() {
		if (!options.selectErrorText) return;
		ErrorTextEvents.querySelectorAll("input").forEach((el) => {
			el.addEventListener("invalid", ErrorTextEvents__selectText);
		});
	}
	function ErrorTextEvents_removeErrorTextListeners() {
		if (!options.selectErrorText) return;
		ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
	}
	const Form = formElement;
	{
		ErrorTextEvents_addErrorTextListeners();
		let processingEvents = false;
		const completed = (opts) => {
			if (!opts.clearAll) Timers_clear();
			else Timers_clearAll();
			if (!opts.cancelled) setTimeout(() => scrollToFirstError(Form, options), 1);
		};
		onDestroy(() => {
			ErrorTextEvents_removeErrorTextListeners();
			completed({ cancelled: true });
		});
		afterNavigate(() => {
			ErrorTextEvents_removeErrorTextListeners();
			if (!processingEvents) completed({ cancelled: false });
		});
		return {
			submitting() {
				Timers_start();
			},
			completed,
			scrollToFirstError() {
				setTimeout(() => scrollToFirstError(Form, options), 1);
			},
			isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed,
			setProcessingEvents(value) {
				processingEvents = value;
			}
		};
	}
}
var scrollToFirstError = async (Form, options) => {
	if (options.scrollToError == "off") return;
	const selector = options.errorSelector;
	if (!selector) return;
	await tick();
	let el;
	el = Form.querySelector(selector);
	if (!el) return;
	el = el.querySelector(selector) ?? el;
	const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
	if (typeof options.scrollToError != "string") el.scrollIntoView(options.scrollToError);
	else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) scrollToAndCenter(el, void 0, options.scrollToError);
	function Form_shouldAutoFocus(userAgent) {
		if (typeof options.autoFocusOnError === "boolean") return options.autoFocusOnError;
		else return !/iPhone|iPad|iPod|Android/i.test(userAgent);
	}
	if (!Form_shouldAutoFocus(navigator.userAgent)) return;
	let focusEl;
	focusEl = el;
	if (![
		"INPUT",
		"SELECT",
		"BUTTON",
		"TEXTAREA"
	].includes(focusEl.tagName)) focusEl = focusEl.querySelector("input:not([type=\"hidden\"]):not(.flatpickr-input), select, textarea");
	if (focusEl) try {
		focusEl.focus({ preventScroll: true });
		if (options.selectErrorText && focusEl.tagName == "INPUT") focusEl.select();
	} catch {}
};
//#endregion
//#region node_modules/sveltekit-superforms/dist/client/proxies.js
function fileProxy(form, path, options) {
	const formFile = fieldProxy(form, path, options);
	const fileProxy = writable({});
	formFile.subscribe((file) => {});
	return {
		subscribe(run) {
			return fileProxy.subscribe(run);
		},
		set(file) {},
		update() {
			throw new SuperFormError("You cannot update a fileProxy, only set it.");
		}
	};
}
function filesProxy(form, path, options) {
	const formFiles = fieldProxy(form, path, options);
	const filesProxy = writable({});
	formFiles.subscribe((files) => {});
	const filesStore = {
		subscribe(run) {
			return filesProxy.subscribe(run);
		},
		set(files) {},
		update(updater) {
			filesStore.set(updater(get(formFiles)));
		}
	};
	return filesStore;
}
function updateProxyField(obj, path, updater) {
	const output = traversePath(obj, path, ({ parent, key, value }) => {
		if (value === void 0) parent[key] = /\D/.test(key) ? {} : [];
		return parent[key];
	});
	if (output) {
		const newValue = updater(output.value);
		output.parent[output.key] = newValue;
	}
	return obj;
}
function superFieldProxy(superForm, path, baseOptions) {
	const form = superForm.form;
	const path2 = splitPath(path);
	const proxy = derived$1(form, ($form) => {
		return traversePath($form, path2)?.value;
	});
	return {
		subscribe(...params) {
			const unsub = proxy.subscribe(...params);
			return () => unsub();
		},
		update(upd, options) {
			form.update((data) => updateProxyField(data, path2, upd), options ?? baseOptions);
		},
		set(value, options) {
			form.update((data) => updateProxyField(data, path2, () => value), options ?? baseOptions);
		}
	};
}
function isSuperForm(form, options) {
	const isSuperForm = "form" in form;
	if (!isSuperForm && options?.taint !== void 0) throw new SuperFormError("If options.taint is set, the whole superForm object must be used as a proxy.");
	return isSuperForm;
}
function fieldProxy(form, path, options) {
	const path2 = splitPath(path);
	if (isSuperForm(form, options)) return superFieldProxy(form, path, options);
	const proxy = derived$1(form, ($form) => {
		return traversePath($form, path2)?.value;
	});
	return {
		subscribe(...params) {
			const unsub = proxy.subscribe(...params);
			return () => unsub();
		},
		update(upd) {
			form.update((data) => updateProxyField(data, path2, upd));
		},
		set(value) {
			form.update((data) => updateProxyField(data, path2, () => value));
		}
	};
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/jsonSchema/schemaShape.js
function schemaShape(schema, path = []) {
	const output = _schemaShape(schema, path);
	if (!output) throw new SchemaError("No shape could be created for schema. If using Zod v4, import { zod4 } from \"sveltekit-superforms/adapters\" instead of { zod }.", path);
	return output;
}
function _schemaShape(schema, path) {
	assertSchema(schema, path);
	const info = schemaInfo(schema, false, path);
	if (info.array || info.union) {
		const arr = info.array || [];
		const union = info.union || [];
		return arr.concat(union).reduce((shape, next) => {
			const nextShape = _schemaShape(next, path);
			if (nextShape) shape = {
				...shape ?? {},
				...nextShape
			};
			return shape;
		}, arr.length ? {} : void 0);
	}
	if (info.properties) {
		const output = {};
		for (const [key, prop] of Object.entries(info.properties)) {
			const shape = _schemaShape(prop, [...path, key]);
			if (shape) output[key] = shape;
		}
		return output;
	}
	return info.types.includes("array") || info.types.includes("object") ? {} : void 0;
}
function shapeFromObject(obj) {
	let output = {};
	const isArray = Array.isArray(obj);
	for (const [key, value] of Object.entries(obj)) {
		if (!value || typeof value !== "object") continue;
		if (isArray) output = {
			...output,
			...shapeFromObject(value)
		};
		else output[key] = shapeFromObject(value);
	}
	return output;
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/client/superForm.js
var formIds = /* @__PURE__ */ new WeakMap();
var initialForms = /* @__PURE__ */ new WeakMap();
var defaultOnError = (event) => {
	throw event.result.error;
};
var defaultFormOptions = {
	applyAction: true,
	invalidateAll: true,
	resetForm: true,
	autoFocusOnError: "detect",
	scrollToError: "smooth",
	errorSelector: "[aria-invalid=\"true\"],[data-invalid]",
	selectErrorText: false,
	stickyNavbar: void 0,
	taintedMessage: false,
	onSubmit: void 0,
	onResult: void 0,
	onUpdate: void 0,
	onUpdated: void 0,
	onError: defaultOnError,
	dataType: "form",
	validators: void 0,
	customValidity: false,
	clearOnSubmit: "message",
	delayMs: 500,
	timeoutMs: 8e3,
	multipleSubmits: "prevent",
	SPA: void 0,
	validationMethod: "auto"
};
/**
* V1 compatibilty. resetForm = false and taintedMessage = true
*/
var LEGACY_MODE = false;
try {
	if (SUPERFORMS_LEGACY) LEGACY_MODE = true;
} catch {}
/**
* Storybook compatibility mode, basically disables the navigating store.
*/
var STORYBOOK_MODE = false;
try {
	if (globalThis.STORIES) STORYBOOK_MODE = true;
} catch {}
/**
* Initializes a SvelteKit form, for convenient handling of values, errors and sumbitting data.
* @param {SuperValidated} form Usually data.form from PageData or defaults, but can also be an object with default values, but then constraints won't be available.
* @param {FormOptions} formOptions Configuration for the form.
* @returns {SuperForm} A SuperForm object that can be used in a Svelte component.
* @DCI-context
*/
function superForm(form, formOptions) {
	let initialForm;
	let options = formOptions ?? {};
	let initialValidator = void 0;
	{
		if (options.legacy ?? LEGACY_MODE) {
			if (options.resetForm === void 0) options.resetForm = false;
			if (options.taintedMessage === void 0) options.taintedMessage = true;
		}
		if (STORYBOOK_MODE) {
			if (options.applyAction === void 0) options.applyAction = false;
		}
		if (typeof options.SPA === "string") {
			if (options.invalidateAll === void 0) options.invalidateAll = false;
			if (options.applyAction === void 0) options.applyAction = false;
		}
		initialValidator = options.validators;
		options = {
			...defaultFormOptions,
			...options
		};
		if ((options.SPA === true || typeof options.SPA === "object") && options.validators === void 0) console.warn("No validators set for superForm in SPA mode. Add a validation adapter to the validators option, or set it to false to disable this warning.");
		if (!form) throw new SuperFormError("No form data sent to superForm. Make sure the output from superValidate is used (usually data.form) and that it's not null or undefined. Alternatively, an object with default values for the form can also be used, but then constraints won't be available.");
		if (Context_isValidationObject(form) === false) form = {
			id: options.id ?? Math.random().toString(36).slice(2, 10),
			valid: false,
			posted: false,
			errors: {},
			data: form,
			shape: shapeFromObject(form)
		};
		form = form;
		const _initialFormId = form.id = options.id ?? form.id;
		const _currentPage = get(page) ?? (STORYBOOK_MODE ? {} : void 0);
		/**
		* Need to clone the form data, in case it's used to populate multiple forms
		* and in components that are mounted and destroyed multiple times.
		* This also means that it needs to be set here, before it's cloned further below.
		*/
		if (!initialForms.has(form)) initialForms.set(form, form);
		initialForm = initialForms.get(form);
		if (_currentPage.form && typeof _currentPage.form === "object") {
			const postedData = _currentPage.form;
			for (const postedForm of Context_findValidationForms(postedData).reverse()) if (postedForm.id == _initialFormId && !initialForms.has(postedForm)) {
				initialForms.set(postedData, postedData);
				const pageDataForm = form;
				form = postedForm;
				form.constraints = pageDataForm.constraints;
				form.shape = pageDataForm.shape;
				if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
					form = clone(pageDataForm);
					form.message = clone(postedForm.message);
				}
				break;
			}
		} else form = clone(initialForm);
		onDestroy(() => {
			Unsubscriptions_unsubscribe();
			NextChange_clear();
			EnhancedForm_destroy();
			for (const events of Object.values(formEvents)) events.length = 0;
			formIds.get(_currentPage)?.delete(_initialFormId);
		});
		if (options.dataType !== "json") {
			const checkForNestedData = (key, value) => {
				if (!value || typeof value !== "object") return;
				if (Array.isArray(value)) {
					if (value.length > 0) checkForNestedData(key, value[0]);
				} else if (!(value instanceof Date) && !(value instanceof File) && true) throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
			};
			for (const [key, value] of Object.entries(form.data)) checkForNestedData(key, value);
		}
	}
	/**
	* Container for store data, subscribed to with Unsubscriptions
	* to avoid "get" usage.
	*/
	const __data = {
		formId: form.id,
		form: clone(form.data),
		constraints: form.constraints ?? {},
		posted: form.posted,
		errors: clone(form.errors),
		message: clone(form.message),
		tainted: void 0,
		valid: form.valid,
		submitting: false,
		shape: form.shape
	};
	const Data = __data;
	const FormId = writable(options.id ?? form.id);
	function Context_findValidationForms(data) {
		return Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
	}
	/**
	* Return false if object isn't a validation object, otherwise the form id,
	* which can be an empty string, so always check with === false
	*/
	function Context_isValidationObject(object) {
		if (!object || typeof object !== "object") return false;
		if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) return false;
		return "id" in object && typeof object.id === "string" ? object.id : false;
	}
	const _formData = writable(form.data);
	const Form$1 = {
		subscribe: _formData.subscribe,
		set: (value, options = {}) => {
			const newData = clone(value);
			Tainted_update(newData, options.taint ?? true);
			return _formData.set(newData);
		},
		update: (updater, options = {}) => {
			return _formData.update((value) => {
				const newData = updater(value);
				Tainted_update(newData, options.taint ?? true);
				return newData;
			});
		}
	};
	function Form_isSPA() {
		return options.SPA === true || typeof options.SPA === "object";
	}
	function Form_resultStatus(defaultStatus) {
		if (defaultStatus > 400) return defaultStatus;
		return (typeof options.SPA === "boolean" || typeof options.SPA === "string" ? void 0 : options.SPA?.failStatus) || defaultStatus;
	}
	async function Form_validate(opts = {}) {
		const dataToValidate = opts.formData ?? Data.form;
		let errors = {};
		let status;
		const validator = opts.adapter ?? options.validators;
		if (typeof validator == "object") {
			if (validator != initialValidator && !("jsonSchema" in validator)) throw new SuperFormError("Client validation adapter found in options.validators. A full adapter must be used when changing validators dynamically, for example \"zod\" instead of \"zodClient\".");
			status = await validator.validate(dataToValidate);
			if (!status.success) errors = mapErrors(status.issues, validator.shape ?? Data.shape ?? {});
			else if (opts.recheckValidData !== false) return Form_validate({
				...opts,
				recheckValidData: false
			});
		} else status = {
			success: true,
			data: {}
		};
		const data = {
			...Data.form,
			...dataToValidate,
			...status.success ? status.data : {}
		};
		return {
			valid: status.success,
			posted: false,
			errors,
			data,
			constraints: Data.constraints,
			message: void 0,
			id: Data.formId,
			shape: Data.shape
		};
	}
	function Form__changeEvent(event) {
		if (!options.onChange || !event.paths.length || event.type == "blur") return;
		let changeEvent;
		const paths = event.paths.map(mergePath);
		if (event.type && event.paths.length == 1 && event.formElement && event.target instanceof Element) changeEvent = {
			path: paths[0],
			paths,
			formElement: event.formElement,
			target: event.target,
			set(path, value, options) {
				fieldProxy({ form: Form$1 }, path, options).set(value);
			},
			get(path) {
				return get(fieldProxy(Form$1, path));
			}
		};
		else changeEvent = {
			paths,
			target: void 0,
			set(path, value, options) {
				fieldProxy({ form: Form$1 }, path, options).set(value);
			},
			get(path) {
				return get(fieldProxy(Form$1, path));
			}
		};
		options.onChange(changeEvent);
	}
	/**
	* Make a client-side validation, updating the form data if successful.
	* @param event A change event, from html input or programmatically
	* @param force Is true if called from validateForm with update: true
	* @param adapter ValidationAdapter, if called from validateForm with schema set
	* @returns SuperValidated, or undefined if options prevented validation.
	*/
	async function Form_clientValidation(event, force = false, adapter) {
		if (event) {
			if (options.validators == "clear") Errors.update(($errors) => {
				setPaths($errors, event.paths, void 0);
				return $errors;
			});
			setTimeout(() => Form__changeEvent(event));
		}
		let skipValidation = false;
		if (!force) {
			if (options.validationMethod == "onsubmit" || options.validationMethod == "submit-only") skipValidation = true;
			else if (options.validationMethod == "onblur" && event?.type == "input") skipValidation = true;
			else if (options.validationMethod == "oninput" && event?.type == "blur") skipValidation = true;
		}
		if (skipValidation || !event || !options.validators || options.validators == "clear") {
			if (event?.paths) {
				const formElement = event?.formElement ?? EnhancedForm_get();
				if (formElement) Form__clearCustomValidity(formElement);
			}
			return;
		}
		const result = await Form_validate({ adapter });
		if (result.valid && (event.immediate || event.type != "input")) Form$1.set(result.data, { taint: "ignore" });
		await tick();
		Form__displayNewErrors(result.errors, event, force);
		return result;
	}
	function Form__clearCustomValidity(formElement) {
		const validity = /* @__PURE__ */ new Map();
		if (options.customValidity && formElement) for (const el of formElement.querySelectorAll(`[name]`)) {
			if (typeof el.name !== "string" || !el.name.length) continue;
			const message = "validationMessage" in el ? String(el.validationMessage) : "";
			validity.set(el.name, {
				el,
				message
			});
			updateCustomValidity(el, void 0);
		}
		return validity;
	}
	async function Form__displayNewErrors(errors, event, force) {
		const { type, immediate, multiple, paths } = event;
		const previous = Data.errors;
		const output = {};
		let validity = /* @__PURE__ */ new Map();
		const formElement = event.formElement ?? EnhancedForm_get();
		if (formElement) validity = Form__clearCustomValidity(formElement);
		traversePaths(errors, (error) => {
			if (!Array.isArray(error.value)) return;
			const currentPath = [...error.path];
			if (currentPath[currentPath.length - 1] == "_errors") currentPath.pop();
			const joinedPath = currentPath.join(".");
			const isObjectError = error.path[error.path.length - 1] == "_errors";
			const isEventError = error.value && paths.some((path) => {
				return isObjectError ? currentPath && path && currentPath.length > 0 && currentPath[0] == path[0] : joinedPath == path.join(".");
			});
			function addError() {
				setPaths(output, [error.path], error.value);
				if (options.customValidity && isEventError && validity.has(joinedPath)) {
					const { el, message } = validity.get(joinedPath);
					if (message != error.value) {
						setTimeout(() => updateCustomValidity(el, error.value));
						validity.clear();
					}
				}
			}
			if (force) return addError();
			if (isEventError && options.validationMethod == "oninput") return addError();
			if (immediate && !multiple && isEventError) return addError();
			if (multiple) {
				const errorPath = pathExists(get(Errors), error.path.slice(0, -1));
				if (errorPath?.value && typeof errorPath?.value == "object") {
					for (const errors of Object.values(errorPath.value)) if (Array.isArray(errors)) return addError();
				}
			}
			const previousError = pathExists(previous, error.path);
			if (previousError && previousError.key in previousError.parent) return addError();
			if (isObjectError) {
				if (options.validationMethod == "oninput" || type == "blur" && Tainted_hasBeenTainted(mergePath(error.path.slice(0, -1)))) return addError();
			} else if (type == "blur" && isEventError) return addError();
		});
		Errors.set(output);
	}
	function Form_set(data, options = {}) {
		if (options.keepFiles) traversePaths(Data.form, (info) => {
			if (info.value instanceof File || false) {
				const dataPath = pathExists(data, info.path);
				if (!dataPath || !(dataPath.key in dataPath.parent)) setPaths(data, [info.path], info.value);
			}
		});
		return Form$1.set(data, options);
	}
	function Form_shouldReset(validForm, successActionResult) {
		return validForm && successActionResult && options.resetForm && (options.resetForm === true || options.resetForm());
	}
	function Form_capture(removeFilesfromData = true) {
		let data = Data.form;
		let tainted = Data.tainted;
		if (removeFilesfromData) {
			const removed = removeFiles(Data.form);
			data = removed.data;
			const paths = removed.paths;
			if (paths.length) {
				tainted = clone(tainted) ?? {};
				setPaths(tainted, paths, false);
			}
		}
		return {
			valid: Data.valid,
			posted: Data.posted,
			errors: Data.errors,
			data,
			constraints: Data.constraints,
			message: Data.message,
			id: Data.formId,
			tainted,
			shape: Data.shape
		};
	}
	async function Form_updateFromValidation(form2, successResult) {
		if (form2.valid && successResult && Form_shouldReset(form2.valid, successResult)) Form_reset({
			message: form2.message,
			posted: true
		});
		else rebind({
			form: form2,
			untaint: successResult,
			keepFiles: true,
			pessimisticUpdate: options.invalidateAll == "force" || options.invalidateAll == "pessimistic"
		});
		if (formEvents.onUpdated.length) await tick();
		for (const event of formEvents.onUpdated) event({ form: form2 });
	}
	function Form_reset(opts = {}) {
		if (opts.newState) initialForm.data = {
			...initialForm.data,
			...opts.newState
		};
		const resetData = clone(initialForm);
		resetData.data = {
			...resetData.data,
			...opts.data
		};
		if (opts.id !== void 0) resetData.id = opts.id;
		const currentTainted = clone(__data.tainted);
		const newTainted = {};
		if (currentTainted && opts.data) {
			for (const key in currentTainted) if (key in opts.data) newTainted[key] = currentTainted[key];
		}
		rebind({
			form: resetData,
			untaint: Object.keys(newTainted).length > 0 ? newTainted : true,
			message: opts.message,
			keepFiles: false,
			posted: opts.posted,
			resetted: true
		});
	}
	async function Form_updateFromActionResult(result) {
		if (result.type == "error") throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
		if (result.type == "redirect") {
			if (Form_shouldReset(true, true)) Form_reset({ posted: true });
			return;
		}
		if (typeof result.data !== "object") throw new SuperFormError("Non-object validation data returned from ActionResult.");
		const forms = Context_findValidationForms(result.data);
		if (!forms.length) throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
		for (const newForm of forms) {
			if (newForm.id !== Data.formId) continue;
			await Form_updateFromValidation(newForm, result.status >= 200 && result.status < 300);
		}
	}
	const Message = writable(__data.message);
	const Constraints = writable(__data.constraints);
	const Posted = writable(__data.posted);
	const Shape = writable(__data.shape);
	const _errors = writable(form.errors);
	const Errors = {
		subscribe: _errors.subscribe,
		set(value, options) {
			return _errors.set(updateErrors(value, Data.errors, options?.force));
		},
		update(updater, options) {
			return _errors.update((value) => {
				return updateErrors(updater(value), Data.errors, options?.force);
			});
		},
		/**
		* To work with client-side validation, errors cannot be deleted but must
		* be set to undefined, to know where they existed before (tainted+error check in oninput)
		*/
		clear: () => Errors.set({})
	};
	let NextChange = null;
	function NextChange_setHtmlEvent(event) {
		if (NextChange && event && Object.keys(event).length == 1 && event.paths?.length && NextChange.target && NextChange.target instanceof HTMLInputElement && NextChange.target.type.toLowerCase() == "file") NextChange.paths = event.paths;
		else NextChange = event;
		setTimeout(() => {
			Form_clientValidation(NextChange);
		}, 0);
	}
	function NextChange_additionalEventInformation(event, immediate, multiple, formElement, target) {
		if (NextChange === null) NextChange = { paths: [] };
		NextChange.type = event;
		NextChange.immediate = immediate;
		NextChange.multiple = multiple;
		NextChange.formElement = formElement;
		NextChange.target = target;
	}
	function NextChange_paths() {
		return NextChange?.paths ?? [];
	}
	function NextChange_clear() {
		NextChange = null;
	}
	const Tainted = {
		state: writable(),
		message: options.taintedMessage,
		clean: clone(form.data)};
	function Tainted_enable() {
		options.taintedMessage = Tainted.message;
	}
	function Tainted_currentState() {
		return Tainted.state;
	}
	function Tainted_hasBeenTainted(path) {
		if (!Data.tainted) return false;
		if (!path) return !!Data.tainted;
		const field = pathExists(Data.tainted, splitPath(path));
		return !!field && field.key in field.parent;
	}
	function Tainted_isTainted(path) {
		if (!arguments.length) return Tainted__isObjectTainted(Data.tainted);
		if (typeof path === "boolean") return path;
		if (typeof path === "object") return Tainted__isObjectTainted(path);
		if (!Data.tainted || path === void 0) return false;
		return Tainted__isObjectTainted(pathExists(Data.tainted, splitPath(path))?.value);
	}
	function Tainted__isObjectTainted(obj) {
		if (!obj) return false;
		if (typeof obj === "object") {
			for (const obj2 of Object.values(obj)) if (Tainted__isObjectTainted(obj2)) return true;
		}
		return obj === true;
	}
	/**
	* Updates the tainted state. Use most of the time, except when submitting.
	*/
	function Tainted_update(newData, taintOptions) {
		if (taintOptions == "ignore") return;
		const paths = comparePaths(newData, Data.form);
		const newTainted = comparePaths(newData, Tainted.clean).map((path) => path.join());
		if (paths.length) {
			Tainted.state.update((currentlyTainted) => {
				if (!currentlyTainted) currentlyTainted = {};
				setPaths(currentlyTainted, paths, (path, data) => {
					if (!newTainted.includes(path.join())) return void 0;
					const currentValue = traversePath(newData, path);
					const cleanPath = traversePath(Tainted.clean, path);
					return currentValue && cleanPath && currentValue.value === cleanPath.value ? void 0 : taintOptions === true ? true : taintOptions === "untaint" ? void 0 : data.value;
				});
				return currentlyTainted;
			});
			NextChange_setHtmlEvent({ paths });
		}
		if (taintOptions == "untaint-all" || taintOptions == "untaint-form") Tainted.state.set(void 0);
	}
	/**
	* Overwrites the current tainted state and setting a new clean state for the form data.
	* @param tainted
	* @param newClean
	*/
	function Tainted_set(tainted, newClean) {
		Tainted.state.set(tainted);
		if (newClean) Tainted.clean = newClean;
	}
	const Submitting = writable(false);
	const Delayed = writable(false);
	const Timeout = writable(false);
	/**
	* Subscribe to certain stores and store the current value in Data, to avoid using get.
	* Need to clone the form data, so it won't refer to the same object and prevent change detection
	*/
	const Unsubscriptions = [
		Tainted.state.subscribe((tainted) => __data.tainted = clone(tainted)),
		Form$1.subscribe((form) => __data.form = clone(form)),
		Errors.subscribe((errors) => __data.errors = clone(errors)),
		FormId.subscribe((id) => __data.formId = id),
		Constraints.subscribe((constraints) => __data.constraints = constraints),
		Posted.subscribe((posted) => __data.posted = posted),
		Message.subscribe((message) => __data.message = message),
		Submitting.subscribe((submitting) => __data.submitting = submitting),
		Shape.subscribe((shape) => __data.shape = shape)
	];
	function Unsubscriptions_unsubscribe() {
		Unsubscriptions.forEach((unsub) => unsub());
	}
	/**
	* Used for SPA action mode and options.customValidity to display errors, even if programmatically set
	*/
	let EnhancedForm;
	function EnhancedForm_get() {
		return EnhancedForm;
	}
	function EnhancedForm_setAction(action) {
		if (EnhancedForm) EnhancedForm.action = action;
	}
	function EnhancedForm_destroy() {
		if (EnhancedForm?.parentElement) EnhancedForm.remove();
		EnhancedForm = void 0;
	}
	const AllErrors = derived$1(Errors, ($errors) => $errors ? flattenErrors($errors) : []);
	options.taintedMessage = void 0;
	function rebind(opts) {
		const form = opts.form;
		const message = opts.message ?? form.message;
		if (opts.untaint || opts.resetted) Tainted_set(typeof opts.untaint === "boolean" ? void 0 : opts.untaint, form.data);
		if (!opts.pessimisticUpdate) Form_set(form.data, {
			taint: "ignore",
			keepFiles: opts.keepFiles
		});
		Message.set(message);
		if (opts.resetted) Errors.update(() => ({}), { force: true });
		else Errors.set(form.errors);
		FormId.set(form.id);
		Posted.set(opts.posted ?? form.posted);
		if (form.constraints) Constraints.set(form.constraints);
		if (form.shape) Shape.set(form.shape);
		__data.valid = form.valid;
		if (options.flashMessage && shouldSyncFlash(options)) {
			const flash = options.flashMessage.module.getFlash(page);
			if (message && get(flash) === void 0) flash.set(message);
		}
	}
	const formEvents = {
		onSubmit: options.onSubmit ? [options.onSubmit] : [],
		onResult: options.onResult ? [options.onResult] : [],
		onUpdate: options.onUpdate ? [options.onUpdate] : [],
		onUpdated: options.onUpdated ? [options.onUpdated] : [],
		onError: options.onError ? [options.onError] : []
	};
	/**
	* Custom use:enhance that enables all the client-side functionality.
	* @param FormElement
	* @param events
	* @DCI-context
	*/
	function superFormEnhance(FormElement, events) {
		if (options.SPA !== void 0 && FormElement.method == "get") FormElement.method = "post";
		if (typeof options.SPA === "string") {
			if (options.SPA.length && FormElement.action == document.location.href) FormElement.action = options.SPA;
		} else EnhancedForm = FormElement;
		if (events) {
			if (events.onError) {
				if (options.onError === "apply") throw new SuperFormError("options.onError is set to \"apply\", cannot add any onError events.");
				else if (events.onError === "apply") throw new SuperFormError("Cannot add \"apply\" as onError event in use:enhance.");
				formEvents.onError.push(events.onError);
			}
			if (events.onResult) formEvents.onResult.push(events.onResult);
			if (events.onSubmit) formEvents.onSubmit.push(events.onSubmit);
			if (events.onUpdate) formEvents.onUpdate.push(events.onUpdate);
			if (events.onUpdated) formEvents.onUpdated.push(events.onUpdated);
		}
		Tainted_enable();
		let lastInputChange;
		async function onInput(e) {
			const info = inputInfo(e.target);
			if (info.immediate && !info.file) await new Promise((r) => setTimeout(r, 0));
			lastInputChange = NextChange_paths();
			NextChange_additionalEventInformation("input", info.immediate, info.multiple, FormElement, e.target ?? void 0);
		}
		async function onBlur(e) {
			if (Data.submitting) return;
			if (!lastInputChange || NextChange_paths() != lastInputChange) return;
			const info = inputInfo(e.target);
			if (info.immediate && !info.file) await new Promise((r) => setTimeout(r, 0));
			if (lastInputChange === void 0) return;
			Form_clientValidation({
				paths: lastInputChange,
				immediate: info.multiple,
				multiple: info.multiple,
				type: "blur",
				formElement: FormElement,
				target: e.target ?? void 0
			});
			lastInputChange = void 0;
		}
		FormElement.addEventListener("focusout", onBlur);
		FormElement.addEventListener("input", onInput);
		onDestroy(() => {
			FormElement.removeEventListener("focusout", onBlur);
			FormElement.removeEventListener("input", onInput);
		});
		const htmlForm = Form(FormElement, {
			submitting: Submitting,
			delayed: Delayed,
			timeout: Timeout
		}, options);
		let currentRequest;
		let customRequest = void 0;
		const enhanced = enhance(FormElement, async (submitParams) => {
			let jsonData = void 0;
			let validationAdapter = options.validators;
			const submit = {
				...submitParams,
				jsonData(data) {
					if (options.dataType !== "json") throw new SuperFormError("options.dataType must be set to 'json' to use jsonData.");
					jsonData = data;
				},
				validators(adapter) {
					validationAdapter = adapter;
				},
				customRequest(request) {
					customRequest = request;
				}
			};
			const _submitCancel = submit.cancel;
			let cancelled = false;
			function clientValidationResult(validation) {
				const validationResult = {
					...validation,
					posted: true
				};
				const status = validationResult.valid ? 200 : Form_resultStatus(400);
				const data = { form: validationResult };
				const result = validationResult.valid ? {
					type: "success",
					status,
					data
				} : {
					type: "failure",
					status,
					data
				};
				setTimeout(() => validationResponse({ result }), 0);
			}
			function clearOnSubmit() {
				switch (options.clearOnSubmit) {
					case "errors-and-message":
						Errors.clear();
						Message.set(void 0);
						break;
					case "errors":
						Errors.clear();
						break;
					case "message":
						Message.set(void 0);
						break;
				}
			}
			async function triggerOnError(result, status) {
				result.status = status;
				if (options.onError !== "apply") {
					const event = {
						result,
						message: Message,
						form
					};
					for (const onErrorEvent of formEvents.onError) if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options.flashMessage?.onError)) await onErrorEvent(event);
				}
				if (options.flashMessage && options.flashMessage.onError) await options.flashMessage.onError({
					result,
					flashMessage: options.flashMessage.module.getFlash(page)
				});
				if (options.applyAction) if (options.onError == "apply") await applyAction();
				else await applyAction({
					status: Form_resultStatus(result.status)});
			}
			function cancel(opts = { resetTimers: true }) {
				cancelled = true;
				if (opts.resetTimers && htmlForm.isSubmitting()) htmlForm.completed({ cancelled });
				return _submitCancel();
			}
			submit.cancel = cancel;
			if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") cancel({ resetTimers: false });
			else {
				if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
					if (currentRequest) currentRequest.abort();
				}
				htmlForm.submitting();
				currentRequest = submit.controller;
				for (const event of formEvents.onSubmit) try {
					await event(submit);
				} catch (error) {
					cancel();
					triggerOnError({
						type: "error",
						error
					}, 500);
				}
			}
			if (cancelled && options.flashMessage) cancelFlash(options);
			if (!cancelled) {
				const noValidate = !Form_isSPA() && (FormElement.noValidate || (submit.submitter instanceof HTMLButtonElement || submit.submitter instanceof HTMLInputElement) && submit.submitter.formNoValidate);
				let validation = void 0;
				const validateForm = async () => {
					return await Form_validate({ adapter: validationAdapter });
				};
				clearOnSubmit();
				if (!noValidate) {
					validation = await validateForm();
					if (!validation.valid) {
						cancel({ resetTimers: false });
						clientValidationResult(validation);
					}
				}
				if (!cancelled) {
					if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) options.flashMessage.module.getFlash(page).set(void 0);
					const submitData = "formData" in submit ? submit.formData : submit.data;
					lastInputChange = void 0;
					if (Form_isSPA()) {
						if (!validation) validation = await validateForm();
						cancel({ resetTimers: false });
						clientValidationResult(validation);
					} else if (options.dataType === "json") {
						if (!validation) validation = await validateForm();
						const postData = clone(jsonData ?? validation.data);
						traversePaths(postData, (data) => {
							if (data.value instanceof File) {
								const key = "__superform_file_" + mergePath(data.path);
								submitData.append(key, data.value);
								return data.set(void 0);
							} else if (Array.isArray(data.value) && data.value.length && data.value.every((v) => v instanceof File)) {
								const key = "__superform_files_" + mergePath(data.path);
								for (const file of data.value) submitData.append(key, file);
								return data.set(void 0);
							}
						});
						Object.keys(postData).forEach((key) => {
							if (typeof submitData.get(key) === "string") submitData.delete(key);
						});
						const chunks = chunkSubstr(stringify(postData, options.transport ? Object.fromEntries(Object.entries(options.transport).map(([k, v]) => [k, v.encode])) : void 0), options.jsonChunkSize ?? 5e5);
						for (const chunk of chunks) submitData.append("__superform_json", chunk);
					}
					if (!submitData.has("__superform_id")) {
						const id = Data.formId;
						if (id !== void 0) submitData.set("__superform_id", id);
					}
					if (typeof options.SPA === "string") EnhancedForm_setAction(options.SPA);
				}
			}
			function chunkSubstr(str, size) {
				const numChunks = Math.ceil(str.length / size);
				const chunks = new Array(numChunks);
				for (let i = 0, o = 0; i < numChunks; ++i, o += size) chunks[i] = str.substring(o, o + size);
				return chunks;
			}
			async function validationResponse(event) {
				let cancelled = false;
				currentRequest = null;
				let result = "type" in event.result && "status" in event.result ? event.result : {
					type: "error",
					status: Form_resultStatus(parseInt(String(event.result.status)) || 500),
					error: event.result.error instanceof Error ? event.result.error : event.result
				};
				const cancel = () => cancelled = true;
				const data = {
					result,
					formEl: FormElement,
					formElement: FormElement,
					cancel
				};
				const unsubCheckforNav = STORYBOOK_MODE || !Form_isSPA() ? () => {} : navigating.subscribe(($nav) => {
					if (!$nav || $nav.from?.route.id === $nav.to?.route.id) return;
					cancel();
				});
				function setErrorResult(error, data, status) {
					data.result = {
						type: "error",
						error,
						status: Form_resultStatus(status)
					};
				}
				htmlForm.setProcessingEvents(true);
				for (const event of formEvents.onResult) try {
					await event(data);
				} catch (error) {
					setErrorResult(error, data, Math.max(result.status ?? 500, 400));
				}
				result = data.result;
				if (!cancelled) {
					if ((result.type === "success" || result.type === "failure") && result.data) {
						const forms = Context_findValidationForms(result.data);
						if (!forms.length) throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
						for (const newForm of forms) {
							if (newForm.id !== Data.formId) continue;
							const data = {
								form: newForm,
								formEl: FormElement,
								formElement: FormElement,
								cancel: () => cancelled = true,
								result
							};
							for (const event of formEvents.onUpdate) try {
								await event(data);
							} catch (error) {
								setErrorResult(error, data, Math.max(result.status ?? 500, 400));
							}
							result = data.result;
							if (!cancelled) {
								if (options.customValidity) setCustomValidityForm(FormElement, data.form.errors);
								if (Form_shouldReset(data.form.valid, result.type == "success")) data.formElement.querySelectorAll("input[type=\"file\"]").forEach((e) => e.value = "");
							}
						}
					}
					if (!cancelled) if (result.type !== "error") {
						if (result.type === "success" && options.invalidateAll) await invalidateAll();
						if (options.applyAction) await applyAction();
						else await Form_updateFromActionResult(result);
					} else await triggerOnError(result, Math.max(result.status ?? 500, 400));
				}
				htmlForm.setProcessingEvents(false);
				if (cancelled && options.flashMessage) cancelFlash(options);
				if (cancelled || result.type != "redirect") htmlForm.completed({ cancelled });
				else if (STORYBOOK_MODE) htmlForm.completed({
					cancelled,
					clearAll: true
				});
				else {
					const unsub = navigating.subscribe(($nav) => {
						if ($nav) return;
						setTimeout(() => {
							try {
								if (unsub) unsub();
							} catch {}
						});
						if (htmlForm.isSubmitting()) htmlForm.completed({
							cancelled,
							clearAll: true
						});
					});
				}
				unsubCheckforNav();
			}
			if (!cancelled && customRequest) {
				_submitCancel();
				const response = await customRequest(submitParams);
				let result;
				if (response instanceof Response) result = deserialize(await response.text());
				else if (response instanceof XMLHttpRequest) result = deserialize(response.responseText);
				else result = response;
				if (result.type === "error") result.status = response.status;
				validationResponse({ result });
			}
			return validationResponse;
		});
		return { destroy: () => {
			for (const [name, events] of Object.entries(formEvents)) formEvents[name] = events.filter((e) => e === options[name]);
			enhanced.destroy();
		} };
	}
	function removeFiles(formData) {
		const paths = [];
		traversePaths(formData, (data) => {
			if (data.value instanceof File) {
				paths.push(data.path);
				return "skip";
			} else if (Array.isArray(data.value) && data.value.length && data.value.every((d) => d instanceof File)) {
				paths.push(data.path);
				return "skip";
			}
		});
		if (!paths.length) return {
			data: formData,
			paths
		};
		const data = clone(formData);
		setPaths(data, paths, (path) => pathExists(initialForm.data, path)?.value);
		return {
			data,
			paths
		};
	}
	return {
		form: Form$1,
		formId: FormId,
		errors: Errors,
		message: Message,
		constraints: Constraints,
		tainted: Tainted_currentState(),
		submitting: readonly(Submitting),
		delayed: readonly(Delayed),
		timeout: readonly(Timeout),
		options,
		capture: Form_capture,
		restore: ((snapshot) => {
			rebind({
				form: snapshot,
				untaint: snapshot.tainted ?? true
			});
		}),
		async validate(path, opts = {}) {
			if (!options.validators) throw new SuperFormError("options.validators must be set to use the validate method.");
			if (opts.update === void 0) opts.update = true;
			if (opts.taint === void 0) opts.taint = false;
			if (typeof opts.errors == "string") opts.errors = [opts.errors];
			let data;
			const splittedPath = splitPath(path);
			if ("value" in opts) if (opts.update === true || opts.update === "value") {
				Form$1.update(($form) => {
					setPaths($form, [splittedPath], opts.value);
					return $form;
				}, { taint: opts.taint });
				data = Data.form;
			} else {
				data = clone(Data.form);
				setPaths(data, [splittedPath], opts.value);
			}
			else data = Data.form;
			const error = pathExists((await Form_validate({ formData: data })).errors, splittedPath);
			if (error && error.value && opts.errors) error.value = opts.errors;
			if (opts.update === true || opts.update == "errors") Errors.update(($errors) => {
				setPaths($errors, [splittedPath], error?.value);
				return $errors;
			});
			return error?.value;
		},
		async validateForm(opts = {}) {
			if (!options.validators && !opts.schema) throw new SuperFormError("options.validators or the schema option must be set to use the validateForm method.");
			const result = opts.update ? await Form_clientValidation({ paths: [] }, true, opts.schema) : Form_validate({ adapter: opts.schema });
			const enhancedForm = EnhancedForm_get();
			if (opts.update && enhancedForm) setTimeout(() => {
				if (!enhancedForm) return;
				scrollToFirstError(enhancedForm, {
					...options,
					scrollToError: opts.focusOnError === false ? "off" : options.scrollToError
				});
			}, 1);
			return result || Form_validate({ adapter: opts.schema });
		},
		allErrors: AllErrors,
		posted: Posted,
		reset(options) {
			return Form_reset({
				message: options?.keepMessage ? Data.message : void 0,
				data: options?.data,
				id: options?.id,
				newState: options?.newState
			});
		},
		submit(submitter) {
			const form = EnhancedForm_get() ? EnhancedForm_get() : submitter && submitter instanceof HTMLElement ? submitter.closest("form") : void 0;
			if (!form) throw new SuperFormError("use:enhance must be added to the form to use submit, or pass a HTMLElement inside the form (or the form itself) as an argument.");
			if (!form.requestSubmit) return form.submit();
			const isSubmitButton = submitter && (submitter instanceof HTMLButtonElement && submitter.type == "submit" || submitter instanceof HTMLInputElement && ["submit", "image"].includes(submitter.type));
			form.requestSubmit(isSubmitButton ? submitter : void 0);
		},
		isTainted: Tainted_isTainted,
		enhance: superFormEnhance
	};
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/jsonSchema/constraints.js
function constraints(schema) {
	return _constraints(schemaInfo(schema, false, []), []);
}
function merge$1(...constraints) {
	const filtered = constraints.filter((c) => !!c);
	if (!filtered.length) return void 0;
	if (filtered.length == 1) return filtered[0];
	return merge(...filtered);
}
function _constraints(info, path) {
	if (!info) return void 0;
	let output = void 0;
	if (info.union && info.union.length) {
		const infos = info.union.map((s) => schemaInfo(s, info.isOptional, path));
		const merged = infos.map((i) => _constraints(i, path));
		output = merge$1(output, ...merged);
		if (output && (info.isNullable || info.isOptional || infos.some((i) => i?.isNullable || i?.isOptional))) delete output.required;
	}
	if (info.array) output = merge$1(output, ...info.array.map((i) => _constraints(schemaInfo(i, info.isOptional, path), path)));
	if (info.properties) {
		const obj = {};
		for (const [key, prop] of Object.entries(info.properties)) {
			const propConstraint = _constraints(schemaInfo(prop, !info.required?.includes(key) || prop.default !== void 0, [key]), [...path, key]);
			if (typeof propConstraint === "object" && Object.values(propConstraint).length > 0) obj[key] = propConstraint;
		}
		output = merge$1(output, obj);
	}
	return output ?? constraint(info);
}
function constraint(info) {
	const output = {};
	const schema = info.schema;
	const type = schema.type;
	const format = schema.format;
	if (type == "integer" && format == "unix-time") {
		const date = schema;
		if (date.minimum !== void 0) output.min = new Date(date.minimum).toISOString();
		if (date.maximum !== void 0) output.max = new Date(date.maximum).toISOString();
	} else if (type == "string") {
		const str = schema;
		const patterns = [str.pattern, ...str.allOf ? str.allOf.map((s) => typeof s == "boolean" ? void 0 : s.pattern) : []].filter((s) => s !== void 0);
		if (patterns.length > 0) output.pattern = patterns[0];
		if (str.minLength !== void 0) output.minlength = str.minLength;
		if (str.maxLength !== void 0) output.maxlength = str.maxLength;
	} else if (type == "number" || type == "integer") {
		const num = schema;
		if (num.minimum !== void 0) output.min = num.minimum;
		else if (num.exclusiveMinimum !== void 0) output.min = num.exclusiveMinimum + (type == "integer" ? 1 : Number.MIN_VALUE);
		if (num.maximum !== void 0) output.max = num.maximum;
		else if (num.exclusiveMaximum !== void 0) output.max = num.exclusiveMaximum - (type == "integer" ? 1 : Number.MIN_VALUE);
		if (num.multipleOf !== void 0) output.step = num.multipleOf;
	} else if (type == "array") {
		const arr = schema;
		if (arr.minItems !== void 0) output.min = arr.minItems;
		if (arr.maxItems !== void 0) output.max = arr.maxItems;
	}
	if (!info.isNullable && !info.isOptional) output.required = true;
	return Object.keys(output).length > 0 ? output : void 0;
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/jsonSchema/schemaHash.js
function schemaHash(schema) {
	return hashCode(_schemaHash(schemaInfo(schema, false, []), 0, []));
}
function _schemaHash(info, depth, path) {
	if (!info) return "";
	function tab() {
		return "  ".repeat(depth);
	}
	function mapSchemas(schemas) {
		return schemas.map((s) => _schemaHash(schemaInfo(s, info?.isOptional ?? false, path), depth + 1, path)).filter((s) => s).join("|");
	}
	function nullish() {
		const output = [];
		if (info?.isNullable) output.push("null");
		if (info?.isOptional) output.push("undefined");
		return !output.length ? "" : "|" + output.join("|");
	}
	if (info.union) return "Union {\n  " + tab() + mapSchemas(info.union) + "\n" + tab() + "}" + nullish();
	if (info.properties) {
		const output = [];
		for (const [key, prop] of Object.entries(info.properties)) {
			const propInfo = schemaInfo(prop, !info.required?.includes(key) || prop.default !== void 0, [key]);
			output.push(key + ": " + _schemaHash(propInfo, depth + 1, path));
		}
		return "Object {\n  " + tab() + output.join(",\n  ") + "\n" + tab() + "}" + nullish();
	}
	if (info.array) return "Array[" + mapSchemas(info.array) + "]" + nullish();
	return info.types.join("|") + nullish();
}
function hashCode(str) {
	let hash = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		const chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	if (hash < 0) hash = hash >>> 0;
	return hash.toString(36);
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/adapters/adapters.js
/* @__NO_SIDE_EFFECTS__ */
function createAdapter(adapter, jsonSchema) {
	if (!adapter || !("superFormValidationLibrary" in adapter)) throw new SuperFormError("Superforms v2 requires a validation adapter for the schema. Import one of your choice from \"sveltekit-superforms/adapters\" and wrap the schema with it.");
	if (!jsonSchema) jsonSchema = adapter.jsonSchema;
	return {
		...adapter,
		constraints: adapter.constraints ?? constraints(jsonSchema),
		defaults: adapter.defaults ?? defaultValues(jsonSchema),
		shape: schemaShape(jsonSchema),
		id: schemaHash(jsonSchema)
	};
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/formData.js
/**
* V1 compatibilty. resetForm = false and taintedMessage = true
*/
var legacyMode = false;
try {
	if (SUPERFORMS_LEGACY) legacyMode = true;
} catch {}
var unionError = "FormData parsing failed: Unions are only supported when the dataType option for superForm is set to \"json\".";
/**
* Check if multiple types represent compatible variations of the same base type
*/
function isCompatibleTypeUnion(types) {
	return new Set(types.map((type) => {
		if (["number", "integer"].includes(type)) return "number";
		if (type === "unix-time") return "number";
		return type;
	})).size <= 1;
}
/**
* Check if union schema represents compatible variations of the same base type
*/
function isCompatibleUnionSchema(union) {
	if (!union) return true;
	const unionTypes = new Set(union.flatMap((u) => u.type ? Array.isArray(u.type) ? u.type : [u.type] : u.const !== void 0 ? [typeof u.const] : []));
	return unionTypes.size <= 1 || unionTypes.size === 2 && unionTypes.has("null");
}
async function parseRequest(data, schemaData, options) {
	let parsed;
	if (data instanceof FormData) parsed = parseFormData(data, schemaData, options);
	else if (data instanceof URL || data instanceof URLSearchParams) parsed = parseSearchParams(data, schemaData, options);
	else if (data instanceof Request) parsed = await tryParseFormData(data, schemaData, options);
	else if (data && typeof data === "object" && "request" in data && data.request instanceof Request) parsed = await tryParseFormData(data.request, schemaData, options);
	else parsed = {
		id: void 0,
		data,
		posted: false
	};
	return parsed;
}
async function tryParseFormData(request, schemaData, options) {
	let formData = void 0;
	try {
		formData = await request.formData();
	} catch (e) {
		if (e instanceof TypeError && e.message.includes("already been consumed")) throw e;
		return {
			id: void 0,
			data: void 0,
			posted: false
		};
	}
	return parseFormData(formData, schemaData, options);
}
function parseSearchParams(data, schemaData, options) {
	if (data instanceof URL) data = data.searchParams;
	const convert = new FormData();
	for (const [key, value] of data.entries()) convert.append(key, value);
	const output = parseFormData(convert, schemaData, options, true);
	output.posted = false;
	return output;
}
function parseFormData(formData, schemaData, options, fromURL = false) {
	function tryParseSuperJson() {
		if (formData.has("__superform_json")) try {
			const transport = options && options.transport ? Object.fromEntries(Object.entries(options.transport).map(([k, v]) => [k, v.decode])) : void 0;
			const output = parse(formData.getAll("__superform_json").join("") ?? "", transport);
			if (typeof output === "object") {
				const filePaths = Array.from(formData.keys());
				for (const path of filePaths.filter((path) => path.startsWith("__superform_file_"))) setPaths(output, [splitPath(path.substring(17))], formData.get(path));
				for (const path of filePaths.filter((path) => path.startsWith("__superform_files_"))) {
					const realPath = splitPath(path.substring(18));
					const allFiles = formData.getAll(path);
					setPaths(output, [realPath], Array.from(allFiles));
				}
				return output;
			}
		} catch {}
		return null;
	}
	const data = tryParseSuperJson();
	const id = formData.get("__superform_id")?.toString();
	return data ? {
		id,
		data,
		posted: true
	} : {
		id,
		data: _parseFormData(formData, schemaData, options, fromURL),
		posted: true
	};
}
function _parseFormData(formData, schema, options, fromURL = false) {
	const output = {};
	let schemaKeys;
	let discriminatedUnionSchema;
	if (options?.strict) schemaKeys = new Set([...formData.keys()].filter((key) => !key.startsWith("__superform_")));
	else {
		let unionKeys = [];
		if (schema.anyOf || schema.oneOf) {
			const info = schemaInfo(schema, false, []);
			if (info.union?.some((s) => s.type !== "object")) throw new SchemaError("All form types must be an object if schema is a union.");
			unionKeys = info.union?.flatMap((s) => Object.keys(s.properties ?? {})) ?? [];
			if (info.union && info.union.length > 1) for (const variant of info.union) {
				const variantProps = variant.properties ?? {};
				const variantPropKeys = Object.keys(variantProps);
				let isMatch = true;
				for (const propKey of variantPropKeys) {
					const prop = variantProps[propKey];
					if (typeof prop !== "boolean" && prop?.const !== void 0) {
						if (formData.get(propKey) !== String(prop.const)) {
							isMatch = false;
							break;
						}
					}
				}
				if (isMatch) {
					discriminatedUnionSchema = variant;
					break;
				}
			}
		}
		schemaKeys = new Set([
			...unionKeys,
			...Object.keys(schema.properties ?? {}),
			...schema.additionalProperties ? formData.keys() : []
		].filter((key) => !key.startsWith("__superform_")));
	}
	function parseSingleEntry(key, entry, info) {
		if (options?.preprocessed && options.preprocessed.includes(key)) return entry;
		if (entry && typeof entry !== "string") return !(legacyMode ? options?.allowFiles === true : options?.allowFiles !== false) ? void 0 : entry.size ? entry : info.isNullable ? null : void 0;
		if (info.types.length > 1 && !isCompatibleTypeUnion(info.types)) throw new SchemaError(unionError, key);
		let [type] = info.types;
		if (entry && !info.types.length && info.schema.enum) if (info.schema.enum.includes(entry)) type = "string";
		else type = Number.isInteger(parseInt(entry, 10)) ? "integer" : "string";
		return parseFormDataEntry(key, entry, type ?? "any", info, fromURL);
	}
	const defaultPropertyType = typeof schema.additionalProperties == "object" ? schema.additionalProperties : { type: "string" };
	for (const key of schemaKeys) {
		const property = discriminatedUnionSchema?.properties ? discriminatedUnionSchema.properties[key] : schema.properties ? schema.properties[key] : defaultPropertyType;
		assertSchema(property, key);
		const info = schemaInfo(property ?? defaultPropertyType, !schema.required?.includes(key), [key]);
		if (!info) continue;
		if (!info.types.includes("boolean") && !schema.additionalProperties && !formData.has(key)) continue;
		const entries = formData.getAll(key);
		if (info.union && info.union.length > 1 && !isCompatibleUnionSchema(info.union)) throw new SchemaError(unionError, key);
		if (info.types.includes("array") || info.types.includes("set")) {
			const items = property.items ?? (info.union?.length == 1 ? info.union[0] : void 0);
			if (!items || typeof items == "boolean" || Array.isArray(items) && items.length != 1) throw new SchemaError("Arrays must have a single \"items\" property that defines its type.", key);
			const arrayType = Array.isArray(items) ? items[0] : items;
			assertSchema(arrayType, key);
			const arrayInfo = schemaInfo(arrayType, info.isOptional, [key]);
			if (!arrayInfo) continue;
			const isFileArray = entries.length && entries.some((e) => e && typeof e !== "string");
			const arrayData = entries.map((e) => parseSingleEntry(key, e, arrayInfo));
			if (isFileArray && arrayData.every((file) => !file)) arrayData.length = 0;
			output[key] = info.types.includes("set") ? new Set(arrayData) : arrayData;
		} else output[key] = parseSingleEntry(key, entries[entries.length - 1], info);
	}
	return output;
}
function parseFormDataEntry(key, value, type, info, fromURL = false) {
	if (!value) {
		if (!fromURL && type == "boolean" && info.isOptional && info.schema.default === true) return false;
		const defaultValue = defaultValues(info.schema, info.isOptional, [key]);
		if (info.schema.enum && defaultValue !== null && defaultValue !== void 0) return value;
		if ("const" in info.schema) return value;
		if (defaultValue !== void 0) return defaultValue;
		if (info.isNullable) return null;
		if (info.isOptional) return void 0;
	}
	function typeError() {
		throw new SchemaError(type[0].toUpperCase() + type.slice(1) + " type found. Set the dataType option to \"json\" and add use:enhance on the client to use nested data structures. More information: https://superforms.rocks/concepts/nested-data", key);
	}
	switch (type) {
		case "string":
		case "any": return value;
		case "integer": return parseInt(value ?? "", 10);
		case "number": return parseFloat(value ?? "");
		case "boolean": return Boolean(value == "false" ? "" : value).valueOf();
		case "stringbool": return value;
		case "unix-time": {
			const date = new Date(value ?? "");
			return !isNaN(date) ? date : void 0;
		}
		case "int64":
		case "bigint": return BigInt(value ?? ".");
		case "symbol": return Symbol(String(value));
		case "set":
		case "array":
		case "object": return typeError();
		default: throw new SuperFormError("Unsupported schema type for FormData: " + type);
	}
}
//#endregion
//#region node_modules/sveltekit-superforms/dist/superValidate.js
/**
* Validates a schema for data validation and usage in superForm.
* @param data Data corresponding to a schema, or RequestEvent/FormData/URL. If falsy, the schema's default values will be used.
* @param schema The schema to validate against.
*/
async function superValidate(data, adapter, options) {
	if (data && "superFormValidationLibrary" in data) {
		options = adapter;
		adapter = data;
		data = void 0;
	}
	const validator = adapter;
	const defaults = options?.defaults ?? validator.defaults;
	const jsonSchema = validator.jsonSchema;
	const parsed = await parseRequest(data, jsonSchema, options);
	const addErrors = options?.errors ?? (options?.strict ? true : !!parsed.data);
	const parsedData = options?.strict ? parsed.data ?? {} : mergeDefaults(parsed.data, defaults);
	let status;
	if (!!parsed.data || addErrors) status = await validator.validate(parsedData);
	else status = {
		success: false,
		issues: []
	};
	const valid = status.success;
	const errors = valid || !addErrors ? {} : mapErrors(status.issues, validator.shape);
	const dataWithDefaults = valid ? status.data : replaceInvalidDefaults(options?.strict ? mergeDefaults(parsedData, defaults) : parsedData, defaults, jsonSchema, status.issues, options?.preprocessed);
	let outputData;
	if (jsonSchema.additionalProperties === false) {
		outputData = {};
		for (const key of Object.keys(jsonSchema.properties ?? {})) if (key in dataWithDefaults) outputData[key] = dataWithDefaults[key];
	} else outputData = dataWithDefaults;
	const output = {
		id: parsed.id ?? options?.id ?? validator.id,
		valid,
		posted: parsed.posted,
		errors,
		data: outputData
	};
	if (!parsed.posted) {
		output.constraints = validator.constraints;
		if (Object.keys(validator.shape).length) output.shape = validator.shape;
	}
	return output;
}
/**
* Sends a message with a form, with an optional HTTP status code that will set
* form.valid to false if status >= 400. A status lower than 400 cannot be sent.
*/
function message(form, message, options) {
	if (options?.status && options.status >= 400) form.valid = false;
	form.message = message;
	const output = options?.removeFiles !== false ? withFiles({ form }) : { form };
	return form.valid ? output : fail(options?.status ?? 400, output);
}
function setError(form, path, error, options) {
	if (error == void 0 || typeof error !== "string" && !Array.isArray(error)) {
		options = error;
		error = path;
		path = "";
	}
	if (options === void 0) options = {};
	const errArr = Array.isArray(error) ? error : [error];
	if (!form.errors) form.errors = {};
	if (path === null || path === "") {
		if (!form.errors._errors) form.errors._errors = [];
		form.errors._errors = options.overwrite ? errArr : form.errors._errors.concat(errArr);
	} else {
		const realPath = splitPath(path);
		const leaf = traversePath(form.errors, realPath, ({ parent, key, value }) => {
			if (value === void 0) parent[key] = {};
			return parent[key];
		});
		if (leaf) leaf.parent[leaf.key] = Array.isArray(leaf.value) && !options.overwrite ? leaf.value.concat(errArr) : errArr;
	}
	form.valid = false;
	const output = options.removeFiles === false ? { form } : withFiles({ form });
	return fail(options.status ?? 400, output);
}
function withFiles(obj) {
	if (typeof obj !== "object") return obj;
	for (const key in obj) {
		const value = obj[key];
		if (value instanceof File) delete obj[key];
		else if (value && typeof value === "object") withFiles(value);
	}
	return obj;
}
var removeFiles = withFiles;
function fail$1(status, data) {
	function checkForm(data) {
		return !!data && typeof data === "object" && "valid" in data && "data" in data && "id" in data;
	}
	function checkObj(data) {
		if (data && typeof data === "object") for (const key in data) {
			const v = data[key];
			if (checkForm(v)) {
				v.valid = false;
				removeFiles(v);
			} else if (v && typeof v === "object") checkObj(v);
		}
		return data;
	}
	return fail(status, checkObj(data));
}

export { setError as a, superForm as b, createAdapter as c, fileProxy as d, filesProxy as e, fail$1 as f, message as m, superValidate as s };
//# sourceMappingURL=client2.js--SBYKgBt.js.map
