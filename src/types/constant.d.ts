declare global {
  type Repositories = {
    id: number;
    owner: string;
    full_name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    health_score: number;
    security: number;
    maintenance: number;
    popularity: number;
    category: string;
    license: string;
    updated_at: string;
    badges: string[];
    hasFullData: boolean;
    scorecard: null | ScoreCard;
    criticality: null | Criticality;
  };

  type ApiRes = {
    success: boolean;
    data: Repositories;
    message?: string;
  };

  type Criticality = {
    score: number;
    commit_frequency: number;
    recent_release_count: number;
    updated_issues_count: number;
    issue_comment_frequency: number;
    github_mention_count: number;
    last_scanned: string;
  };

  type ScoreCard = {
    score: number;
    version: string;
    last_scanned: string;
    checks: {
      name: string;
      score: number;
      reason: string;
      details?: string[];
      doc_url: string;
    }[];
  };
}

export {};
