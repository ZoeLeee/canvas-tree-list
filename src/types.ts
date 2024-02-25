export type TreeItemOption = {
	label: string;
	id: string | number;
	data?: any;
	expanded?: boolean;
	selected?: boolean;
	children?: TreeItemOption[];
};
