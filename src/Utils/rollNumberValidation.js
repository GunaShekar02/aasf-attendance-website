const validRollNumber = (roll) => /^20\d{2}(BCS|IMT|IMG)-\d{3}$/.test(roll);

export default validRollNumber;
