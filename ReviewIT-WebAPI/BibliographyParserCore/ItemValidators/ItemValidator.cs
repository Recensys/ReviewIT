using System.Collections.Generic;
using BibliographyParserCore.ItemChecker;
using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.ItemValidators
{
    /// <summary>
    /// This class is used for validating bibliographic <see cref="StudySourceItemDTO"/> objects.
    /// </summary>
    public class ItemValidator : IItemValidator
    {
        readonly IDictionary<StudySourceItemDTO.ItemType, IItemChecker> _checkers;
        readonly IItemChecker _defaultChecker;

        /// <summary>
        /// Constructs a new ItemValidator.
        /// </summary>
        /// <param name="checkers">
        /// A dictionary of field checkers per studySourceItemDto type.
        /// If a checker for an studySourceItemDto type is not specified, <see cref="DefaultItemChecker"/> is used.
        /// </param>
        /// <param name="defaultChecker">The <see cref="IItemChecker"/> implementation to use as default</param>
        public ItemValidator(IItemChecker defaultChecker = null, IDictionary<StudySourceItemDTO.ItemType, IItemChecker> checkers = null)
        {
            _checkers = checkers ?? new Dictionary<StudySourceItemDTO.ItemType, IItemChecker>();
            _defaultChecker = defaultChecker ?? new DefaultItemChecker();
        }

        /// <summary>
        /// Checks whether or not a given studySourceItemDto is valid.
        /// </summary>
        /// <param name="studySourceItemDtovalidate.</param>
        /// <returns>true if the studySourceItemDto is valid; false otherwise.</returns>
        public bool IsItemValid(StudySourceItemDTO studySourceItemDto)
        {
            return _checkers.ContainsKey(studySourceItemDto.Type) ? _checkers[studySourceItemDto.Type].Validate(studySourceItemDto) : _defaultChecker.Validate(studySourceItemDto);
        }
    }
}
