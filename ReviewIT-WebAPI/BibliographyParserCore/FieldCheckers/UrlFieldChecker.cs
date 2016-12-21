using System.Text.RegularExpressions;

namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// A field checker to verify whether a field represents a valid URL.
    /// </summary>
    public class UrlFieldChecker : IFieldChecker
    {
        Regex _r = new Regex(@"^(https?:\/\/(www\.)?[a-z]+(\.[a-z]+)+)((\/(([a-z]+)(\.[a-z]+)?)?)?)+$");
        public bool Validate(string field)
        {
            return _r.IsMatch(field);
        }
    }
}
