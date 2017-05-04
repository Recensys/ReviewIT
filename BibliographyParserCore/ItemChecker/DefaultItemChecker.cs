using System.Linq;
using BibliographyParserCore.FieldValidators;
using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.ItemChecker
{
    /// <summary>
    /// Default <see cref="IItemChecker"/> implementation for when no custom checker is specified.
    /// When all fields contained by the studySourceItemDto are valid, the studySourceItemDto is valid.
    /// </summary>
    public class DefaultItemChecker : IItemChecker
    {
        private readonly FieldValidator _validator;

        public DefaultItemChecker(FieldValidator fieldValidator = null)
        {
            _validator = fieldValidator ?? new FieldValidator();
        }

        public bool Validate(StudySourceItemDTO studySourceItemDto)
        {
            return studySourceItemDto.Fields.All(field => _validator.IsFieldValid(field.Value, field.Key));
        }
    }
}
