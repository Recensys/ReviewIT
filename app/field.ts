export interface Field{
    type: string,
    name: string,
    input: boolean
}

export interface Radio extends Field{
    options: string[],
    selected: string 
}

export interface Checkbox extends Field{
    values: any[]
}

export interface String extends Field{
    value: string
}

export interface Resource extends Field{
    url: string
}
