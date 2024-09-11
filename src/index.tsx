import * as React from "react";

export interface Person {
	name: string;
	age: number;
}

export function MyComponent({
	children,
	person,
}: {
	children: React.ReactNode;
	person: Person;
}) {
	return (
		<>
			{children}
			<div>
				<h1>{person.name}</h1>
				<h2>{person.age}</h2>
			</div>
		</>
	);
}
