export const getUserQuery = `
SELECT
  u.*,
  rc.*
FROM
  public."Users" u
  JOIN public."refCommunication" rc ON CAST(rc."refUserId" AS INTEGER) = u."refUserId"
WHERE
  u."refUserId" = $1;

`;



export const userUpdateQuery = `
UPDATE public."Users"
SET
  "refUserFname" = $1,
  "refUserLname" = $2,
  "refDOB" = $3,
  "refGender" = $4,
  "refMaritalStatus" = $5,
  "refEducation" = $6,
  "refOccupationLvl" = $7,
  "refSector" = $8,
  "activeStatus" = $9,
  "updatedBy" = $10
  
WHERE "refUserId" = $11
RETURNING *;
`;

export const communicationUpdateQuery =`UPDATE public."refCommunication"
SET
  "refUserEmail" = $1,
  "refAddress" = $2,
  "refDistrict" = $3,
  "refPincode" = $4
  
WHERE "refUserId" = $5
RETURNING *;
`;