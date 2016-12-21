using System;
using System.Text.RegularExpressions;

namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// A field checker to verify whether a string represents a valid year, represented as four digits.
    /// </summary>
    public class YearFieldChecker : IFieldChecker
    {
        readonly Regex _r = new Regex(@"[\d]{4}");
        public bool Validate(string field)
        {
            if (!_r.IsMatch(field)) return false;
            var year = int.Parse(field);
            return year <= DateTime.UtcNow.Year && year >= 0;
        }
    }
}
