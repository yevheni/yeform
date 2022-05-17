export interface YeFieldOptions {
	key: string,
	value: string,
	changed: number,
	required: boolean,
	isValid(): boolean,
}

export class YeField {
	key: YeFieldOptions["key"] = "";
	value: YeFieldOptions["value"] = "";
	changed: YeFieldOptions["changed"] = 0;
	required: YeFieldOptions["required"] = false;

	get is_valid() {
		return this.isValid();
	}

	constructor(field?: Partial<YeFieldOptions>) {
		if (typeof field?.key !== "undefined") {
			this.key = field.key;
		}

		if (typeof field?.value !== "undefined") {
			this.value = field.value;
		}

		if (typeof field?.changed !== "undefined") {
			this.changed = field.changed;
		}

		if (typeof field?.required !== "undefined") {
			this.required = field.required;
		}

		if (typeof field?.isValid !== "undefined") {
			this.isValid = field.isValid.bind(this);
		}
	}

	isValid() {
		return !!this.value.trim();
	}
}

export class YeForm {
	_fields: Partial<YeFieldOptions>[] = [];
	fields: YeField[] = [];

	get result() {
		return this.getResult();
	}

	get object() {
		return this.getObject();
	}

	get is_valid() {
		return this.isValid();
	}

	constructor(fields: Partial<YeFieldOptions>[] = []) {
		this._fields = fields;
		this.fields = fields.map(field => new YeField(field));
	}

	isValid() {
		const valid = !this.fields.filter(field => field.required && !field.is_valid).length;

		return valid;
	}

	getField(key: string) {
		return this.fields.find(field => field.key === key);
	}

	getObject() {
		const result: Record<string, YeField> = {};

		this.fields.forEach(field => {
			result[field.key] = field;
		});

		return result;
	}

	getResult() {
		const result: Record<string, any> = {};

		this.fields.forEach(field => {
			result[field.key] = field.value;
		});

		return result;
	}
}
