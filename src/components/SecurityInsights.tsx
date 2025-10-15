import { motion } from "motion/react";
import { Shield, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Badge } from "./ui/badge";

interface SecurityIssue {
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  line?: number;
}

const securityIssues: SecurityIssue[] = [
  {
    severity: "high",
    title: "Deprecated API Usage",
    description: "Using deprecated crypto.createCipher() - migrate to crypto.createCipheriv()",
    line: 145
  },
  {
    severity: "medium",
    title: "Insecure Random Generator",
    description: "Math.random() is not cryptographically secure. Use crypto.randomBytes()",
    line: 89
  },
  {
    severity: "low",
    title: "Missing Input Validation",
    description: "User input is not sanitized before database query",
    line: 203
  }
];

export function SecurityInsights() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-error text-white";
      case "high":
        return "bg-error/80 text-white";
      case "medium":
        return "bg-primary-accent text-heading-text";
      case "low":
        return "bg-secondary-accent text-heading-text";
      default:
        return "bg-secondary-accent text-heading-text";
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical" || severity === "high") {
      return <AlertTriangle className="w-5 h-5" />;
    }
    return <Info className="w-5 h-5" />;
  };

  return (
    <motion.div
      className="bg-surface rounded-2xl p-6 border border-border-divider mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-heading-text mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-accent" />
            Security & Vulnerability Analysis
          </h2>
          <p className="text-body-text text-sm">
            AI-powered security scan for deprecated APIs and insecure patterns
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl text-heading-text mb-1">B+</div>
          <div className="text-xs text-subtext">Security Grade</div>
        </div>
      </div>

      {/* Security Score Breakdown */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-lg text-success mb-1">0</div>
          <div className="text-xs text-subtext">Critical</div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-lg text-error mb-1">1</div>
          <div className="text-xs text-subtext">High</div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-lg text-primary-accent mb-1">1</div>
          <div className="text-xs text-subtext">Medium</div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-lg text-subtext mb-1">1</div>
          <div className="text-xs text-subtext">Low</div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {securityIssues.map((issue, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border-divider"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-10 h-10 rounded-lg ${getSeverityColor(issue.severity)} flex items-center justify-center flex-shrink-0`}>
              {getSeverityIcon(issue.severity)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-heading-text text-sm">{issue.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {issue.severity.toUpperCase()}
                </Badge>
                {issue.line && (
                  <span className="text-xs text-subtext">Line {issue.line}</span>
                )}
              </div>
              <p className="text-body-text text-sm mb-3">{issue.description}</p>
              <button className="text-primary-accent text-sm hover:text-heading-text transition-colors">
                View Fix Recommendation →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Best Practices */}
      <div className="mt-6 pt-6 border-t border-border-divider">
        <h3 className="text-heading-text text-sm mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-success" />
          Security Best Practices Followed
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-body-text">
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            <span>Environment variables for secrets</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-body-text">
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            <span>HTTPS for all connections</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-body-text">
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            <span>SQL injection prevention</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-body-text">
            <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            <span>XSS protection enabled</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
