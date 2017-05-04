using System;

namespace RecensysCoreBLL.CriteriaEngine.Evaluators
{
    public class NumberEvaluator: IEvaluator
    {
        public bool Eval(string expected, string op, string actual)
        {
            int fnumber;
            int dnumber;
            if (!int.TryParse(expected, out fnumber))
            {
                throw new NumberEvaluatorException($"The following field value could not be passed: {expected}");
            }
            if (!int.TryParse(actual, out dnumber))
            {
                throw new NumberEvaluatorException($"The following data value could not be passed: {actual}");
            }

            switch (op)
            {
                case ">":
                    return fnumber > dnumber;
                case ">=":
                    return fnumber >= dnumber;

                case "<":
                    return fnumber < dnumber;
                case "<=":
                    return fnumber <= dnumber;

                case "==":
                    return fnumber == dnumber;

                default:
                    throw new NumberEvaluatorException($"An illigal operator was used: {op}");
            }
        }
    }

    public class NumberEvaluatorException : Exception
    {
        public NumberEvaluatorException()
        {
        }

        public NumberEvaluatorException(string message)
        : base(message)
        {
        }

        public NumberEvaluatorException(string message, Exception inner)
        : base(message, inner)
        {
        }
    }
}