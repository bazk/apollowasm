import { useState, useEffect } from "react";
import { skip } from "rxjs/operators";

export default function useSubject(subject) {
  const [state, setState] = useState(subject.getValue());

  useEffect(() => {
    const sub = subject.pipe(skip(1)).subscribe(s => setState(s));
    return () => sub.unsubscribe();
  });

  return state;
}
