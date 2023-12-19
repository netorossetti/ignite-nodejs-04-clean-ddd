import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log("sendNewAnswerNotification: ", answer);
  }
}

/** Explicação: .bind(this)
 *
 * esta função tem por sua definição dizer para o local onde ela for
 * chamada, no caso dos eventos, a classe DomainEvents, que o "this" se referencia a
 * ela mesma, e não a classe DomainEvents.
 */
