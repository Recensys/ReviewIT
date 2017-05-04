using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.ItemChecker
{
    /// <summary>
    /// Interface for field checkers.
    /// </summary>
    public interface IItemChecker
    {
        /// <summary>
        /// Checks whether a specified studySourceItemDto is valid.
        /// </summary>
        /// <param name="studySourceItemDtovalidate.</param>
        /// <returns>true when the specified studySourceItemDto is valid; false otherwise.</returns>
        bool Validate(StudySourceItemDTO studySourceItemDto);
    }
}
