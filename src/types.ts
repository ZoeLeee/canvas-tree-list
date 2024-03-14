export type TreeItemOption = {
	label: string;
	id: number;
	data?: any;
	expanded?: boolean;
	selected?: boolean;
	children?: TreeItemOption[];
};
