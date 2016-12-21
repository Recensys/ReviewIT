using System.Collections.Generic;
using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore
{
    /// <summary>
    /// Parses text containing bibliographic data into a collection of bibliography <see cref="StudySourceItemDTO"/> objects.
    /// </summary>
    public interface IBibliographyParser
    {
        List<StudySourceItemDTO> Parse(string data);
    }
}
