import * as React from "react";
export interface Person {
    name: string;
    age: number;
}
export declare function MyComponent({ children, person, }: {
    children: React.ReactNode;
    person: Person;
}): any;
