using System.Collections.Generic;
using BibliographyParserCore.FieldCheckers;
using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.FieldValidators
{
    /// <summary>
    /// Class which validates fields associated to bibliographic items.
    /// </summary>
    public class FieldValidator : IFieldValidator
    {
        readonly IDictionary<StudySourceItemDTO.FieldType, IFieldChecker> _checkers;
        readonly IFieldChecker _defaultChecker;

        /// <summary>
        /// Constructs a new <see cref="FieldValidator"/>.
        /// </summary>
        /// <param name="checkers">A dictionary of field checkers. If not specified, <see cref="DefaultFieldChecker"/> is used.</param>
        /// <param name="defaultChecker">The <see cref="IFieldChecker"/> implementation to use as default</param>
        public FieldValidator(IFieldChecker defaultChecker = null, IDictionary<StudySourceItemDTO.FieldType, IFieldChecker> checkers = null)
        {
            _checkers = checkers ?? new Dictionary<StudySourceItemDTO.FieldType, IFieldChecker>();
            _defaultChecker = defaultChecker ?? new DefaultFieldChecker();
        }

        /// <summary>
        /// Checks whether or not a given field is valid.
        /// </summary>
        /// <param name="field">The field data to validate.</param>
        /// <param name="type">The field type.</param>
        /// <returns>returns true if the field is valid; false otherwise.</returns>
        public bool IsFieldValid(string field, StudySourceItemDTO.FieldType type)
        {
            return _checkers.ContainsKey(type) ? _checkers[type].Validate(field) : _defaultChecker.Validate(field);
        }
    }
}