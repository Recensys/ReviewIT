using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.ItemValidators
{
    public interface IItemValidator
    {
        /// <summary>
        /// Checks whether or not a given studySourceItemDto is valid.
        /// </summary>
        /// <param name="studySourceItemDtovalidate.</param>
        /// <returns>true if the studySourceItemDto is valid; false otherwise.</returns>
        bool IsItemValid(StudySourceItemDTO studySourceItemDto);
    }
}