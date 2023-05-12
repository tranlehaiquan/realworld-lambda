vi.mock("./src/data-source", () => {
  return {
    connect: vi.fn(),
  };
});

vi.mock("./src/entity/User", () => {
  const User: any = vi.fn();
  User.find = vi.fn();
  User.findUserByEmailAndPassword = vi.fn();
  User.prototype.save = vi.fn();
  User.prototype.setPassword = vi.fn();
  User.prototype.excludeSensitiveData = vi.fn();
  
  return {
    User,
  };
});
