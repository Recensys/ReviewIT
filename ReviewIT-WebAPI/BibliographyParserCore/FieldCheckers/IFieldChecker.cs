namespace BibliographyParserCore.FieldCheckers
{
    /// <summary>
    /// Interface for field checkers.
    /// </summary>
    public interface IFieldChecker
    {
        /// <summary>
        /// Checks whether a specified field is valid.
        /// </summary>
        /// <param name="field">The field to validate.</param>
        /// <returns>true when the specified field is valid; false otherwise.</returns>
        bool Validate(string field);
    }
}
