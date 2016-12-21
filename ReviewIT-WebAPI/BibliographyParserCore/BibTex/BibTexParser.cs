using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using BibliographyParserCore.ItemValidators;
using RecensysCoreRepository.DTOs;

namespace BibliographyParserCore.BibTex
{
    /// <summary>
    /// Parses text containing bibliographic data in BibTex format into a collection of bibliography <see cref="StudySourceItemDTO"/> objects.
    /// </summary>
    public class BibTexParser : IBibliographyParser
    {
        readonly ItemValidator _validator;

        /// <summary>
        /// Regex for matching BibTex items.
        /// </summary>
        readonly Regex _entryRegex = new Regex(@"(?:@(\w+)\{([\w]+),((?:\W*[a-zA-Z]+\W?=\W?\{.*\},?)*)\W*\},?)");

        /// <summary>
        /// Regex for matching fields within a BibTex item.
        /// </summary>
        readonly Regex _fieldRegex = new Regex(@"([a-zA-Z]+)\W?=\W?\{(.*)\},?");

        /// <summary>
        /// Constructs a new BibTex Parser.
        /// </summary>
        /// <param name="validator">An <see cref="ItemValidator"/> for validating if an item fulfills given requirements.</param>
        public BibTexParser(ItemValidator validator)
        {
            _validator = validator;
        }

        /// <summary>
        /// Takes a BibTex file as string as parses it to a Dictionary containing the Bibliography
        /// </summary>
        /// <param name="data">A BibTex file as a string</param>
        /// <returns>A dictionary of the Bibliography</returns>
        public List<StudySourceItemDTO> Parse(string data)
        {
            // Computing regex matches from the data.
            MatchCollection matchCollection = _entryRegex.Matches(data);

            // Collection to store the BibTex items.
            var items = new List<StudySourceItemDTO>();

            // Iterate over every BibTex item in the data.
            foreach (Match match in matchCollection)
            {
                try
                {
                    // Get the BibTex item and associated field values.
                    string key = match.Groups[2].Value;
                    StudySourceItemDTO.ItemType type = (StudySourceItemDTO.ItemType)Enum.Parse(typeof(StudySourceItemDTO.ItemType), match.Groups[1].Value, true);
                    Dictionary<StudySourceItemDTO.FieldType, string> fields = ParseItem(match.Groups[3].Value);
                    var item = new StudySourceItemDTO(type, fields);

                    // Validate the item.
                    if (!_validator.IsItemValid(item))
                    {
                        throw new InvalidDataException($"The item with key {key} is not valid");
                    }

                    items.Add(item);
                }
                catch (ArgumentException e)
                {
                    throw new InvalidDataException($"The item type {match.Groups[1].Value} is not known by the parser", e);
                }
            }

            return items;
        }

        private Dictionary<StudySourceItemDTO.FieldType, string> ParseItem(string data)
        {
            // Compute regex matches from the data.
            var matchCollection = _fieldRegex.Matches(data);

            // Collection to store the BibTex items.
            var items = new Dictionary<StudySourceItemDTO.FieldType, string>();

            // Iterate over every field.
            foreach (Match match in matchCollection)
            {
                try
                {
                    // Get the field type and value.
                    var key = (StudySourceItemDTO.FieldType)Enum.Parse(typeof(StudySourceItemDTO.FieldType), match.Groups[1].Value, true);
                    var value = match.Groups[2].Value;

                    items.Add(key, value);
                }
                catch (ArgumentException e)
                {   
                    throw new InvalidDataException(
                        $"The field type {match.Groups[1].Value} is not known by the parser", e);
                }
            }

            return items;
        }
    }
}

