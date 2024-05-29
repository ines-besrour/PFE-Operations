export const mockConventionModel = () => ({
  create: jest.fn(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  exec: jest.fn(),
});

export const mockLettreAffectationModel = () => ({
  create: jest.fn(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  exec: jest.fn(),
});

export const mockFicheDePropositionModel = () => ({
  create: jest.fn(),
  findOne: jest.fn().mockReturnThis(),
  findOneAndDelete: jest.fn().mockReturnThis(),
  exec: jest.fn(),
});
