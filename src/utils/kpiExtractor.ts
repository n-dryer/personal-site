/**
 * Utility functions for extracting KPIs from achievement text
 */

export type KPI = {
  /** Extracted metric value (e.g., "11%", "$300K", "166%") */
  value: string;
  /** Context description (e.g., "sprint velocity", "cost savings") */
  context: string;
  /** Original achievement text */
  originalText: string;
};

/**
 * Extracts KPIs from achievement strings using pattern matching
 */
export const extractKPIs = (achievements: string[]): KPI[] => {
  if (!achievements || !Array.isArray(achievements)) {
    return [];
  }

  try {
    const kpis: KPI[] = [];

    // Patterns for different KPI types
    const patterns = [
      // Percentage patterns: "11%", "by 35%", "from 20% to 70%"
      {
        regex: /(?:by |increased?|improved?|raised?|boosted?|grew?).*?(\d+(?:\.\d+)?%)/gi,
        contextExtractor: (text: string, value: string) =>
          text
            .toLowerCase()
            .replace(value.toLowerCase(), '')
            .trim()
            .split(/\s+/)
            .slice(0, 4)
            .join(' '),
      },
      // Currency patterns: "$300K", "$1M", "$100M"
      {
        regex: /\$(\d+(?:\.\d+)?[KMB]?)/gi,
        contextExtractor: (text: string, value: string) => {
          const beforeValue = text.substring(0, text.indexOf(value));
          const afterValue = text.substring(text.indexOf(value) + value.length);
          const context = (beforeValue + afterValue).toLowerCase();

          if (context.includes('saving') || context.includes('cost')) return 'cost savings';
          if (context.includes('funding') || context.includes('secured')) return 'funding secured';
          if (context.includes('revenue') || context.includes('annual')) return 'revenue';
          if (context.includes('contract')) return 'contract value';
          return 'financial impact';
        },
      },
      // User/growth patterns: "20K to 400K", "120K users"
      {
        regex: /(\d+(?:\.\d+)?[KMB]?)\s*(?:users?|customers?|people)/gi,
        contextExtractor: () => 'user growth',
      },
      // Time reduction patterns: "4-6 months to 1 month"
      {
        regex: /(?:from )?(\d+(?:-\d+)?\s*months?)\s*to\s*(\d+\s*months?)/gi,
        contextExtractor: () => 'time reduction',
      },
    ];

    achievements.forEach((achievement) => {
      patterns.forEach(({ regex, contextExtractor }) => {
        const matches = Array.from(achievement.matchAll(regex));
        matches.forEach((match) => {
          const value = match[1] || match[0];
          const context = contextExtractor(achievement, value);

          kpis.push({
            value,
            context,
            originalText: achievement,
          });
        });
      });
    });

    // Remove duplicates and limit to top 3 KPIs per experience
    const uniqueKPIs = kpis.filter(
      (kpi, index, arr) =>
        arr.findIndex((k) => k.value === kpi.value && k.context === kpi.context) === index,
    );

    return uniqueKPIs.slice(0, 3);
  } catch (error) {
    console.error('Error extracting KPIs:', error);
    return [];
  }
};

/**
 * Formats a KPI for display
 */
export const formatKPI = (kpi: KPI): string => {
  return `${kpi.value} ${kpi.context}`;
};
