import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import type { Profile, Subject, Talk, TeachingRole } from "@/content/types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#111827",
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 44,
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 14,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#059669",
    marginBottom: 3,
  },
  tagline: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactLink: {
    fontSize: 8,
    color: "#059669",
    textDecoration: "none",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
  },
  summaryText: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.5,
  },
  // Education
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  eduSchool: {
    fontSize: 8,
    color: "#6B7280",
  },
  // Experience
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  expInstitution: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  expPeriod: {
    fontSize: 8,
    color: "#9CA3AF",
  },
  expRole: {
    fontSize: 9,
    color: "#059669",
    marginBottom: 3,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    fontSize: 7,
    color: "#374151",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  // Courses
  courseItem: {
    marginBottom: 6,
    flexDirection: "row",
    gap: 8,
  },
  courseName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    flex: 1,
  },
  courseMeta: {
    fontSize: 8,
    color: "#6B7280",
  },
  // Talks
  talkItem: {
    marginBottom: 8,
  },
  talkHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  talkTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  talkYear: {
    fontSize: 8,
    color: "#9CA3AF",
  },
  talkEvent: {
    fontSize: 8,
    color: "#059669",
    marginBottom: 2,
  },
  talkDesc: {
    fontSize: 8,
    color: "#6B7280",
    lineHeight: 1.5,
  },
});

interface TeacherPdfProps {
  profile: Profile;
  roles: TeachingRole[];
  subjects: Subject[];
  talks: Talk[];
}

export default function TeacherPDFDocument({
  profile,
  roles,
  subjects,
  talks,
}: TeacherPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.tagline}>Professor técnico de TI</Text>
          <View style={styles.contactRow}>
            <Link
              src={`mailto:${profile.contact.email}`}
              style={styles.contactLink}
            >
              {profile.contact.email}
            </Link>
            <Link src={profile.contact.linkedin} style={styles.contactLink}>
              LinkedIn
            </Link>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Profissional</Text>
          <Text style={styles.summaryText}>
            {profile.about.slice(0, 2).join(" ")}
          </Text>
        </View>

        {/* Teaching experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência Docente</Text>
          {roles.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expInstitution}>{exp.institution}</Text>
                <Text style={styles.expPeriod}>{exp.period}</Text>
              </View>
              <Text style={styles.expRole}>{exp.role}</Text>
              <View style={styles.tagRow}>
                {exp.subjects.map((s) => (
                  <Text key={s} style={styles.tag}>
                    {s}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disciplinas Ministradas</Text>
          {subjects.map((c, i) => (
            <View key={i} style={styles.courseItem}>
              <Text style={styles.courseName}>{c.name}</Text>
              <Text style={styles.courseMeta}>
                {c.level} · {c.audience} · {c.institution}
              </Text>
            </View>
          ))}
        </View>

        {/* Talks */}
        {talks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Palestras & Workshops</Text>
            {talks.map((t, i) => (
              <View key={i} style={styles.talkItem}>
                <View style={styles.talkHeader}>
                  <Text style={styles.talkTitle}>{t.title}</Text>
                  <Text style={styles.talkYear}>{t.year}</Text>
                </View>
                <Text style={styles.talkEvent}>{t.event}</Text>
                <Text style={styles.talkDesc}>{t.description}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
