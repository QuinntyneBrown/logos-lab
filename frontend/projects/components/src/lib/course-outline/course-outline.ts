import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { IconName } from '../icon/icon-name';
import { CourseOutlineCurrentToken } from './course-outline-current-token';
import { CourseOutlineLesson } from './course-outline-lesson';
import { CourseOutlineSection } from './course-outline-section';
import { CourseOutlineSectionToggle } from './course-outline-section-toggle';

/** A course's syllabus as sections that open and close, each listing its lessons with their state. */
@Component({
  selector: 'nav[llCourseOutline]',
  imports: [NgTemplateOutlet, RouterLink, Icon],
  templateUrl: './course-outline.html',
  styleUrl: './course-outline.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'outline',
    '[class.outline--compact]': 'compact()',
    '[attr.aria-label]': 'label()',
    '[hidden]': '!sections().length',
  },
})
export class CourseOutline {
  readonly label = input.required<string>();
  readonly sections = input.required<readonly CourseOutlineSection[]>();
  readonly compact = input(false);
  readonly currentToken = input<CourseOutlineCurrentToken>('page');
  /** Scrolls the current lesson into view, inside its own scrolling ancestor, when first shown. */
  readonly revealCurrent = input(false);

  readonly sectionToggled = output<CourseOutlineSectionToggle>();
  readonly lessonChosen = output<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      if (!this.revealCurrent()) return;
      const current = this.host.querySelector<HTMLElement>('[aria-current]');
      const scroller = current && scrollingAncestor(current, this.host);
      if (current && scroller) {
        const offset = current.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
        scroller.scrollTop += offset - scroller.clientHeight / 3;
      }
    });
  }

  /** The native `toggle` also fires when the page sets `open`; only the learner's own change is passed on. */
  protected toggled(id: string, wasOpen: boolean, event: Event): void {
    const open = (event.target as HTMLDetailsElement).open;
    if (open !== wasOpen) this.sectionToggled.emit({ id, open });
  }

  /** The hidden count hint, set off from the count by a space ("1 of 5 lessons completed"). */
  protected hintText(hint: string | null): string {
    return hint ? ` ${hint}` : '';
  }

  /** The hidden state text, set off from the title by a comma ("3.1 Title, completed"). */
  protected stateText(label: string | null): string {
    return label ? `, ${label}` : '';
  }

  protected iconFor(lesson: CourseOutlineLesson): IconName {
    if (lesson.state === 'done') return 'check';
    if (lesson.state === 'locked') return 'lock';
    switch (lesson.type) {
      case 'video':
        return 'video';
      case 'module':
        return 'module';
      case 'cohort':
        return 'people';
      default:
        return 'article';
    }
  }

  /** "Video · 6 min" in full; the length alone, or the short kind, when compact. */
  protected timeFor(lesson: CourseOutlineLesson): string {
    const parts = this.compact()
      ? [lesson.timeLabel ?? lesson.shortKind ?? lesson.kind]
      : [lesson.kind, lesson.timeLabel];
    return [...parts, lesson.optionalLabel].filter(Boolean).join(' · ');
  }
}

/** The nearest ancestor of `element`, up to the outline's parent, that scrolls vertically. */
function scrollingAncestor(element: HTMLElement, outline: HTMLElement): HTMLElement | null {
  for (let node = element.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) {
      return node;
    }
    if (node === outline.parentElement) break;
  }
  return null;
}
