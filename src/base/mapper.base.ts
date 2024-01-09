export interface Mapper<Input, Output> {
  map(data: Input): Output;
  reverseMap(data: Output): Input;
}
