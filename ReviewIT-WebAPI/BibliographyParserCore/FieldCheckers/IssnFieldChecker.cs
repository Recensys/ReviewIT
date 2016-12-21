using System.Linq;
using System.Text.RegularExpressions;

namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// A field checker to verify whether an ISNN field is valid.
    /// ISSN, International Standard Serial Number is a unique idenfier of items.
    /// More info can be found at: https://en.wikipedia.org/wiki/International_Standard_Serial_Number
    /// </summary>
    public class IssnFieldChecker : IFieldChecker
    {
        readonly Regex _issn = new Regex(@"^\d{4}-\d{3}[\dxX]$");
        public bool Validate(string field)
        {
            return _issn.IsMatch(field) && IssnCheck(field.Replace("-", ""));
        }

        static bool IssnCheck(string issn)
        {
            if (issn.Length != 8) return false;

            var c = issn.Substring(7, 1)[0];
            var n = issn.Substring(0, 7);

            var r = n.Select((t, i) => (8 - i) * GetDigit(t)).Sum() % 11;
            return (r == 0 ? 0 : 11 - r) == GetDigit(c);
        }

        static int GetDigit(char c)
        {
            return c == 'x' || c == 'X' ? 10 : int.Parse(c.ToString());
        }
    }
}
