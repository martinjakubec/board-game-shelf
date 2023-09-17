import { isNewPasswordValid } from "./passwordValidator"

const lowercase = "aaaa"
const uppercase = "AAAA"
const numbers = "1234"
const specialCharacters = "&*()"

describe("Password Validator in prod environment", () => {
  it("returns true for password containing at least one uppercase letter, one lowercase letter, one number and one special character and is at least 10 chars long", () => {
    expect(
      isNewPasswordValid(
        `${lowercase}${uppercase}${numbers}${specialCharacters}`
      )
    ).toBe(true)
  })

  it("should return false if password is too short", () => {
    expect(isNewPasswordValid("1234567")).toBe(false)
  })

  it("should return false if doesn't contain a number", () => {
    expect(
      isNewPasswordValid(`${lowercase}${uppercase}${specialCharacters}`)
    ).toBe(false)
  })

  it("should return false if password doesn't contain a lowercase letter", () => {
    expect(
      isNewPasswordValid(`${uppercase}${numbers}${specialCharacters}`)
    ).toBe(false)
  })

  it("should return false if password doesn't contain an uppercase letter", () => {
    expect(
      isNewPasswordValid(`${lowercase}${numbers}${specialCharacters}`)
    ).toBe(false)
  })

  it("should return false if password doesn't contain a special character", () => {
    expect(isNewPasswordValid(`${lowercase}${uppercase}${numbers}`)).toBe(false)
  })
})
