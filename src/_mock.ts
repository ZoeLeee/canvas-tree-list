import { TreeItemOption } from "./types";

let id = 0;

export const Mock_Data: TreeItemOption[] = [
	...Array.from({ length: 2 }, () => ({
		label: `Option ${id++}`,
		id: id++,
	})),
	{
		label: "Option 1",
		id: id++,
		children: [
			{
				label: "Option 1.1",
				id: id++,
			},
			{
				label: "Option 1.1",
				id: id++,
			},
			{
				label: "Option 1.1",
				id: id++,
			},
			{
				label: "Option 1.1",
				id: id++,
			},
			{
				label: "Option 1.1",
				id: id++,
			},
		],
	},
	{
		label: "Option 1",
		id: id++,
		children: [
			...Array.from({ length: 20 }, () => ({
				label: `Option ${id++}`,
				id: id++,
			})),
			{
				label: "Option 1.1",
				id: id++,
				children: [
					...Array.from({ length: 20 }, () => ({
						label: `Option ${id++}`,
						id: id++,
					})),
				],
			},
		],
	},
	...Array.from({ length: 10 }, () => ({
		label: `Option ${id++}`,
		id: id++,
	})),
];
