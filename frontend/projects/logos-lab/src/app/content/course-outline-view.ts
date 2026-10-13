import {
  CourseLesson,
  CourseOverview,
  LessonKind,
  LessonState,
  MyCourseState,
} from '@logos-lab/api';
import {
  CourseOutlineLesson,
  CourseOutlineLessonType,
  CourseOutlineSection,
} from '@logos-lab/components';
import { minutes } from './content-facts';

/** Who the outline is for: it decides why a locked lesson is locked and what the counts say. */
export type OutlineViewer = 'visitor' | 'member' | 'enrolled';

const TYPES: Record<LessonKind, CourseOutlineLessonType> = {
  video: 'video',
  text: 'text',
  article: 'article',
  module: 'module',
  discussion: 'cohort',
};

function kindLabel(kind: LessonKind): string {
  switch (kind) {
    case 'video':
      return $localize`:@@lesson.kind.video:Video`;
    case 'text':
      return $localize`:@@lesson.kind.text:Text`;
    case 'article':
      return $localize`:@@lesson.kind.article:Article`;
    case 'module':
      return $localize`:@@lesson.kind.module:Module`;
    case 'discussion':
      return $localize`:@@lesson.kind.discussion:Cohort discussion`;
  }
}

function lockedLabel(viewer: OutlineViewer): string {
  switch (viewer) {
    case 'visitor':
      return $localize`:@@outline.locked.visitor:locked: sign in and enrol to open`;
    case 'member':
      return $localize`:@@outline.locked.member:locked: enrol to open`;
    case 'enrolled':
      return $localize`:@@outline.locked.enrolled:locked: finish the previous lesson first`;
  }
}

/**
 * The course's sections as the outline shows them, for one viewer. `open` holds the sections the
 * learner opened or closed themselves; every other section opens by the rule: the one with the next
 * lesson for a learner, else the first.
 */
export function toCourseOutline(
  course: CourseOverview,
  mine: MyCourseState | null,
  viewer: OutlineViewer,
  courseSlug: string,
  open: Readonly<Record<string, boolean>>,
): readonly CourseOutlineSection[] {
  const states = new Map<string, LessonState>(
    (mine?.lessons ?? []).map((lesson) => [lesson.lessonId, lesson.state]),
  );
  const stateOf = (lesson: CourseLesson): LessonState =>
    viewer === 'enrolled' ? (states.get(lesson.id) ?? 'locked') : 'locked';

  return course.sections.map((section, index) => {
    const lessons = section.lessons.map((lesson): CourseOutlineLesson => {
      const state = stateOf(lesson);
      const locked = state === 'locked';
      return {
        id: lesson.id,
        title: lesson.title,
        type: TYPES[lesson.kind],
        kind: kindLabel(lesson.kind),
        shortKind: lesson.kind === 'discussion' ? $localize`:@@lesson.kind.cohort:Cohort` : null,
        timeLabel: lesson.minutes === null ? null : minutes(lesson.minutes),
        optionalLabel: lesson.optional ? $localize`:@@lesson.optional:Optional` : null,
        state: locked ? 'locked' : state === 'done' ? 'done' : 'available',
        current: state === 'current',
        stateLabel: locked
          ? lockedLabel(viewer)
          : state === 'done'
            ? $localize`:@@outline.done:completed`
            : null,
        path: locked ? null : `/courses/${courseSlug}/lessons/${lesson.id}`,
      };
    });
    const done = lessons.filter((lesson) => lesson.state === 'done').length;
    const count = lessons.length;
    const hasCurrent = lessons.some((lesson) => lesson.current);
    const rule = viewer === 'enrolled' ? hasCurrent : index === 0;
    return {
      id: section.id,
      name: section.title,
      countLabel:
        viewer === 'enrolled'
          ? $localize`:@@outline.count.progress:${done}:done: of ${count}:count:`
          : count === 1
            ? $localize`:@@outline.count.one:1 lesson`
            : $localize`:@@outline.count.other:${count}:count: lessons`,
      countHint: viewer === 'enrolled' ? $localize`:@@outline.count.hint:lessons completed` : null,
      open: open[section.id] ?? rule,
      lessons,
    };
  });
}
