-- RedefineIndex
DROP INDEX "Notification_recipientId_idx";
CREATE INDEX "Notification_recepientId_idx" ON "Notification"("recepientId");
