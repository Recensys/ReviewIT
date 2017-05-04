using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.FieldValidators
{
    public interface IFieldValidator
    {
        /// <summary>
        /// Checks whether or not a given field is valid.
        /// </summary>
        /// <param name="field">The field data to validate.</param>
        /// <param name="type">The field type.</param>
        /// <returns>returns true if the field is valid; false otherwise.</returns>
        bool IsFieldValid(string field, StudySourceItemDTO.FieldType type);
    }
}