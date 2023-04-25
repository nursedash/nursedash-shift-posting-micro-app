const facilityFields = `
    id
    name
    email
    timezone
    allowedQualifications
    covidStatus
    rates {
      unit
      type
      description
      defaultShiftDescription
      defaultShiftQualifications
    }
    covidVaccineRequired
    covidMedicalExemption
    covidReligiousExemption
`;

export default facilityFields;
