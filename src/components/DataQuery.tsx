import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useAppSelector } from "../hooks/useStoreTypes";
import { selectEnrichedEvents } from "../store/selectors/EventSelectors";
import { QueryService } from "../services/QueryService";
import { UtilService } from "../services/UtilService";

export const DataQuery = () => {
  const farms = useAppSelector((state) => state.farmModule.farms);
  const enrichedEvents = useAppSelector(selectEnrichedEvents);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { he } = UtilService;

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const result = await QueryService.ask(question, {
        farms,
        events: enrichedEvents,
      });
      setAnswer(result);
    } catch {
      setError(he.queryError);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="data-query-container">
      <div className="data-query-input-row">
        <InputText
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={he.queryPlaceholder}
          disabled={loading}
          className="data-query-input"
        />
        <Button
          icon="pi pi-send"
          onClick={handleSubmit}
          disabled={loading || !question.trim()}
        />
      </div>
      {loading && <ProgressSpinner className="data-query-spinner" />}
      {answer && <p className="data-query-answer">{answer}</p>}
      {error && <p className="data-query-error">{error}</p>}
    </div>
  );
};
